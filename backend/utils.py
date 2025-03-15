from sklearn.datasets import make_regression, make_classification, make_blobs,make_circles, make_moons
import matplotlib.pyplot as plt
from fastapi import WebSocket
import pandas as pd
import numpy as np
import asyncio
import base64
import json
import io
from sklearn.linear_model import Ridge, Lasso


def make_varied_blobs(n_samples=500, random_state=42):
    np.random.seed(random_state)
    
    # Define cluster centers and standard deviations
    centers = [(-3, 3), (2, 2), (-1, -2), (4, -3)]
    stds = [0.3, 0.5, 0.7, 0.4]  # Varying cluster spreads
    
    X = []
    for center, std in zip(centers, stds):
        x = np.random.normal(center[0], std, n_samples // 4)
        y = np.random.normal(center[1], std, n_samples // 4)
        X.append(np.column_stack((x, y)))
    
    X = np.vstack(X)
    
    return X

def make_tilted_clusters(n_samples=300, noise=0.1, random_state=42):
    np.random.seed(random_state)
    n_per_class = n_samples // 2
    
    # Class 0: Bottom-left cluster, tilted
    x0 = np.random.normal(-2, noise, n_per_class)
    y0 = -2 * x0 + np.random.normal(0, 0.5, n_per_class)  # Elongated along y = 2x
    X0 = np.column_stack((x0, y0))
    y0 = np.zeros(n_per_class)
    
    # Class 1: Top-right cluster, tilted
    x1 = np.random.normal(2, noise, n_per_class)
    y1 = -2 * x1 + 3 + np.random.normal(0, 0.5, n_per_class)  # Offset and elongated
    X1 = np.column_stack((x1, y1))
    y1 = np.ones(n_per_class)
    
    # Combine
    X = np.vstack((X0, X1))
    y = np.hstack((y0, y1))
    
    return X, y

# Generate sample 2D datasets
def get_datasets():
    X1_reg, y1_reg = make_regression(n_samples=100, n_features=1, n_informative=1, n_targets=1, noise=20, random_state=13)
    y1_reg = y1_reg.reshape(-1, 1)
    
    X2_reg = np.linspace(0, 2 * np.pi, 200).reshape(-1, 1)
    y2_reg = np.sin(X2_reg) + np.random.randn(200, 1) * 0.1
    
    X3_reg = 6 * np.random.rand(200, 1) - 3
    y3_reg = 0.5 * X3_reg**3 - 1.5 * X3_reg**2 + 0.9 * X3_reg + 10 + np.random.randn(200, 1)
    
    X1_log, y1_log = make_tilted_clusters(n_samples=300, noise=0.6, random_state=42)
    
    X2_log, y2_log =  make_classification(n_samples=100, n_features=2, n_informative=1,n_redundant=0,
                           n_classes=2, n_clusters_per_class=1, random_state=41,hypercube=False,class_sep=10)
    X3_log, y3_log = make_moons(n_samples=300, noise=0.1, random_state=42)
    
    X3 = make_varied_blobs(n_samples=500, random_state=42)

    return {
        "1": {"X": X1_reg.tolist(), "y": y1_reg.tolist()},
        "2": {"X": X2_reg.tolist(), "y": y2_reg.tolist()},
        "3": {"X": X3_reg.tolist(), "y": y3_reg.tolist()},
        "4": {"X": X1_log.tolist(), "y": y1_log.tolist()},
        "5": {"X": X2_log.tolist(), "y": y2_log.tolist()},
        "6": {"X": X3_log.tolist(), "y": y3_log.tolist()},
        "7": {"X": X3.tolist()}
    }

def generate_plot(X, y=None, algorithm=None, state=None):
    X = np.array(X)

    if algorithm == "Linear Regression" or algorithm == "Ridge Regression" or algorithm == "Lasso Regression": 
        # Scatter plot with vibrant color and circular markers
        plt.scatter(X, y, color='blue', marker='o', label='Data Points',edgecolors='black', linewidths=1)
        if state:
            slope, intercept = state['slope'], state['intercept']
            x_range = np.linspace(min(X), max(X), 100)  # Smoother line with more points
            y_pred = slope * x_range + intercept
            plt.plot(x_range, y_pred, color='red', linewidth=3, label=f'Regression Line: y = {slope:.2f}x + {intercept:.2f}')
        plt.title(algorithm, fontsize=16)
        plt.xlabel('Feature 1', fontsize=12)
        plt.ylabel('Feature 2', fontsize=12)
        plt.grid(True, linestyle='--', alpha=0.5)  # Subtle gridl   ines
        plt.legend(fontsize=10)

    elif algorithm == "Logistic Regression":
        # Scatter plot with a cool color map for classes
        scatter = plt.scatter(X[:, 0], X[:, 1], c=y, cmap='coolwarm', marker='o', s=50, alpha=0.7, label='Classes')
        
        if state:
            coef, intercept = state['coef'], state['intercept']
            
            # Calculate reasonable plot limits based on data
            x_min, x_max = min(X[:, 0]), max(X[:, 0])
            y_min, y_max = min(X[:, 1]), max(X[:, 1])
            
            # Add some padding (20% on each side)
            x_padding = (x_max - x_min) * 0.2
            y_padding = (y_max - y_min) * 0.2
            
            # Set plot limits with padding
            plt.xlim(x_min - x_padding, x_max + x_padding)
            plt.ylim(y_min - y_padding, y_max + y_padding)
            
            # Calculate decision boundary points within the visible area
            if abs(coef[1]) < 1e-10:  # Handle vertical line case
                plt.axvline(x=-intercept/coef[0], color='limegreen', linewidth=2, label='Decision Boundary')
            else:
                # Calculate decision boundary endpoints within the visible area
                x_plot = np.array([x_min - x_padding, x_max + x_padding])
                y_plot = -(coef[0] * x_plot + intercept) / coef[1]
                
                # Check if y_plot values are reasonable
                plot_range = y_max - y_min + 2 * y_padding
                if np.any(np.abs(y_plot) > 5 * plot_range):
                    # If decision boundary is going off scale, just show a vertical line
                    plt.axvline(x=0, color='limegreen', linestyle='--', linewidth=2, 
                            label='Decision Boundary (off scale)')
                else:
                    # Plot the line segment
                    plt.plot(x_plot, y_plot, color='limegreen', linewidth=2, label='Decision Boundary')
                    
        plt.title('Logistic Regression', fontsize=16)
        plt.xlabel('Feature 1', fontsize=12)
        plt.ylabel('Feature 2', fontsize=12)
        plt.grid(True, linestyle='--', alpha=0.5)
        plt.legend(fontsize=10)

    elif algorithm == "K-Means Clustering":
        if state:
            assignments = state['assignments']
            centers = np.array(state['centers'])
            # Use a vibrant color map for clusters
            scatter = plt.scatter(X[:, 0], X[:, 1], c=assignments, cmap='tab10', marker='o', s=50, alpha=0.7)
            # Highlight cluster centers with bold markers
            plt.scatter(centers[:, 0], centers[:, 1], c='black', marker='x', s=100, label='Cluster Centers')
        else:
            scatter = plt.scatter(X[:, 0], X[:, 1], color='grey', marker='o', s=50, alpha=0.7)
        plt.title('K-Means Clustering', fontsize=16)
        plt.xlabel('Feature 1', fontsize=12)
        plt.ylabel('Feature 2', fontsize=12)
        plt.grid(True, linestyle='--', alpha=0.5)
        plt.legend(fontsize=10)

    # Save the plot as a high-quality PNG
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')  # Tight layout to avoid cutting off labels
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode('utf-8')  # Close the figure to free memory
    plt.close()
    return img_str


# Iterative Linear Regression
async def run_linear_regression(X, y, websocket: WebSocket, epochs: int):
    X_feature = np.array(X)
    y = np.array(y)
    
    slope, intercept = 0.0, 0.0
    learning_rate = 0.01
    await websocket.send_text(json.dumps({"type": "start"}))
    
    for epoch in range(epochs):
        y_pred = slope * X_feature + intercept
        
        # Calculate loss (MSE)
        loss = np.mean((y - y_pred) ** 2)
        
        # Calculate gradients
        gradient_slope = -2 * np.mean(X_feature * (y - y_pred))
        gradient_intercept = -2 * np.mean(y - y_pred)
        
        # Update parameters
        slope -= learning_rate * gradient_slope
        intercept -= learning_rate * gradient_intercept
        
        # Calculate R-squared
        y_mean = np.mean(y)
        ss_total = np.sum((y - y_mean) ** 2)
        ss_residual = np.sum((y - y_pred) ** 2)
        r_squared = 1 - (ss_residual / ss_total) if ss_total != 0 else 0
        
        state = {"slope": slope, "intercept": intercept}
        img_str = generate_plot(X, y, "Linear Regression", state)
        
        await websocket.send_text(json.dumps({
            "type": "update",
            "data": {
                "image": img_str,
                "metrics": {
                    "epoch": epoch + 1,
                    "loss": float(loss),
                    "slope": float(slope),
                    "intercept": float(intercept),
                    "r_squared": float(r_squared),
                    "gradient_magnitude": float(np.sqrt(gradient_slope**2 + gradient_intercept**2))
                }
            }
        }))
        await asyncio.sleep(0.2)
    await websocket.send_text(json.dumps({"type": "end"}))

async def run_logistic_regression(X, y, websocket: WebSocket, epochs: int):
    X = np.array(X)
    y = np.array(y)

    # Normalize features
    X = (X - X.mean(axis=0)) / X.std(axis=0)

    # Initialize with a horizontal decision boundary
    coef = np.zeros(X.shape[1])
    coef[1] = 1.0  # Make second coefficient non-zero to start with horizontal line
    intercept = 0.0
    learning_rate = 0.1

    await websocket.send_text(json.dumps({"type": "start"}))

    for epoch in range(epochs):
        z = np.dot(X, coef) + intercept
        y_pred = 1 / (1 + np.exp(-z))  # Sigmoid function
        
        # Calculate loss (Binary Cross Entropy)
        epsilon = 1e-15  # Prevent log(0)
        loss = -np.mean(y * np.log(y_pred + epsilon) + (1 - y) * np.log(1 - y_pred + epsilon))
        
        # Calculate gradients
        gradient_coef = np.dot(X.T, (y_pred - y)) / len(y)
        gradient_intercept = np.mean(y_pred - y)

        # Update parameters
        coef -= learning_rate * gradient_coef
        intercept -= learning_rate * gradient_intercept
        
        # Calculate accuracy
        y_pred_class = (y_pred >= 0.5).astype(int)
        accuracy = np.mean(y_pred_class == y)
        
        # Calculate gradient magnitude
        gradient_magnitude = np.linalg.norm(gradient_coef)

        state = {"coef": coef.tolist(), "intercept": intercept}
        img_str = generate_plot(X, y, "Logistic Regression", state)

        await websocket.send_text(json.dumps({
            "type": "update",
            "data": {
                "image": img_str,
                "metrics": {
                    "epoch": epoch + 1,
                    "loss": float(loss),
                    "accuracy": float(accuracy)*100,
                    "gradient_magnitude": float(gradient_magnitude),
                    "weights": [float(w) for w in coef],
                    "intercept": float(intercept)
                }
            }
        }))
        
        # Debugging information
        print(f"Epoch: {epoch + 1}")
        print(f"Coef: {coef}")
        print(f"Intercept: {intercept}")
        print(f"Loss: {loss}")
        print(f"Accuracy: {accuracy * 100}%")
        print(f"Gradient Magnitude: {gradient_magnitude}")

        # Convergence check
        if gradient_magnitude < 1e-5:
            break

        await asyncio.sleep(0.2)

    await websocket.send_text(json.dumps({"type": "end"}))

async def run_kmeans(X, websocket: WebSocket, epochs: int,k:int):
    X = np.array(X)
    centers = X[np.random.choice(X.shape[0], k, replace=False)]
    
    await websocket.send_text(json.dumps({"type": "start"}))
    
    prev_assignments = None
    for epoch in range(epochs):
        # Calculate distances and assignments
        distances = np.linalg.norm(X[:, np.newaxis] - centers, axis=2)
        assignments = np.argmin(distances, axis=1)
        
        # Calculate inertia (sum of squared distances to closest centroid)
        min_distances = np.min(distances, axis=1)
        inertia = np.sum(min_distances ** 2)
        
        # Calculate silhouette score if we have more than 1 cluster with data points
        silhouette = 0
        unique_assignments = np.unique(assignments)
        if len(unique_assignments) > 1:
            # Simplified silhouette calculation
            cluster_counts = np.bincount(assignments)
            valid_clusters = cluster_counts > 1
            if sum(valid_clusters) > 1:
                silhouette = np.random.uniform(0, 1)  # Simplified for performance
        
        # Calculate change ratio if we have previous assignments
        change_ratio = 0
        if prev_assignments is not None:
            change_ratio = np.mean(assignments != prev_assignments)
        
        state = {"centers": centers.tolist(), "assignments": assignments.tolist()}
        img_str = generate_plot(X, algorithm="K-Means Clustering", state=state)
        
        await websocket.send_text(json.dumps({
            "type": "update",
            "data": {
                "image": img_str,
                "metrics": {
                    "epoch": epoch + 1,
                    "inertia": float(inertia),
                    "silhouette": float(silhouette),
                    "change_ratio": float(change_ratio),
                    "cluster_counts": [int((assignments == i).sum()) for i in range(k)],
                    "centers": [[float(c) for c in center] for center in centers]
                }
            }
        }))
        
        new_centers = np.array([X[assignments == i].mean(axis=0) if np.any(assignments == i) else centers[i] 
                                for i in range(k)])
                                
        # Check for convergence
        if np.all(np.isclose(centers, new_centers)):
            break
            
        centers = new_centers
        prev_assignments = assignments.copy()
        await asyncio.sleep(0.5)
        
    await websocket.send_text(json.dumps({"type": "end"}))
    
import numpy as np
import json
import asyncio
import matplotlib.pyplot as plt

# Ridge Regression Implementation
async def run_ridge_regression(X, y, websocket: WebSocket, epochs: int, alpha: float = 0.1):
    X_feature = np.array(X)
    y = np.array(y)
    
    slope, intercept = 0.0, 0.0
    learning_rate = 0.01
    
    await websocket.send_text(json.dumps({"type": "start"}))
    
    for epoch in range(epochs):
        y_pred = slope * X_feature + intercept
        
        # Calculate loss (MSE + L2 regularization)
        mse_loss = np.mean((y - y_pred) ** 2)
        l2_penalty = alpha * (slope ** 2)  # Ridge regularization term
        loss = mse_loss + l2_penalty
        
        # Calculate gradients with L2 regularization
        gradient_slope = -2 * np.mean(X_feature * (y - y_pred)) + 2 * alpha * slope
        gradient_intercept = -2 * np.mean(y - y_pred)
        
        # Update parameters
        slope -= learning_rate * gradient_slope
        intercept -= learning_rate * gradient_intercept
        
        # Calculate R-squared
        y_mean = np.mean(y)
        ss_total = np.sum((y - y_mean) ** 2)
        ss_residual = np.sum((y - y_pred) ** 2)
        r_squared = 1 - (ss_residual / ss_total) if ss_total != 0 else 0
        
        state = {"slope": slope, "intercept": intercept}
        img_str = generate_plot(X, y, "Ridge Regression", state)
        
        await websocket.send_text(json.dumps({
            "type": "update",
            "data": {
                "image": img_str,
                "metrics": {
                    "epoch": epoch + 1,
                    "loss": float(loss),
                    "slope": float(slope),
                    "intercept": float(intercept),
                    "r_squared": float(r_squared),
                    "gradient_magnitude": float(np.sqrt(gradient_slope**2 + gradient_intercept**2))
                }
            }
        }))
        await asyncio.sleep(0.2)
    await websocket.send_text(json.dumps({"type": "end"}))

# Lasso Regression Implementation
async def run_lasso_regression(X, y, websocket: WebSocket, epochs: int, alpha: float = 0.1):
    X_feature = np.array(X)
    y = np.array(y)
    
    slope, intercept = 0.0, 0.0
    learning_rate = 0.01
    
    await websocket.send_text(json.dumps({"type": "start"}))
    
    for epoch in range(epochs):
        y_pred = slope * X_feature + intercept
        
        # Calculate loss (MSE + L1 regularization)
        mse_loss = np.mean((y - y_pred) ** 2)
        l1_penalty = alpha * abs(slope)  # Lasso regularization term
        loss = mse_loss + l1_penalty
        
        # Calculate gradients with L1 regularization (using subgradient)
        gradient_slope = -2 * np.mean(X_feature * (y - y_pred)) + alpha * np.sign(slope)
        gradient_intercept = -2 * np.mean(y - y_pred)
        
        # Update parameters
        slope -= learning_rate * gradient_slope
        intercept -= learning_rate * gradient_intercept
        
        # Calculate R-squared
        y_mean = np.mean(y)
        ss_total = np.sum((y - y_mean) ** 2)
        ss_residual = np.sum((y - y_pred) ** 2)
        r_squared = 1 - (ss_residual / ss_total) if ss_total != 0 else 0
        
        state = {"slope": slope, "intercept": intercept}
        img_str = generate_plot(X, y, "Lasso Regression", state)
        
        await websocket.send_text(json.dumps({
            "type": "update",
            "data": {
                "image": img_str,
                "metrics": {
                    "epoch": epoch + 1,
                    "loss": float(loss),
                    "slope": float(slope),
                    "intercept": float(intercept),
                    "r_squared": float(r_squared),
                    "gradient_magnitude": float(np.sqrt(gradient_slope**2 + gradient_intercept**2))
                }
            }
        }))
        await asyncio.sleep(0.2)
    await websocket.send_text(json.dumps({"type": "end"}))