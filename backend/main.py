from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket
from utils import get_datasets, run_linear_regression, run_logistic_regression, run_kmeans, run_ridge_regression, run_lasso_regression
import uvicorn
import json

origins = ["*"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

datasets = get_datasets()

# Endpoint to get dataset (unchanged, but less critical now)
@app.get("/dataset/{dataset_id}")
async def get_dataset(dataset_id: str):
    if dataset_id in datasets:
        return datasets[dataset_id]
    return {"error": "Dataset not found"}

# Update your WebSocket endpoint to accept the degree parameter
@app.websocket("/ws/{algorithm}/{dataset_id}/{epochs}/{k}/{degree}")
async def websocket_endpoint(websocket: WebSocket, algorithm: str, dataset_id: str, epochs: int, k: int, degree: int = 1):
    await websocket.accept()
    if dataset_id not in datasets:
        await websocket.send_text(json.dumps({"error": "Invalid dataset"}))
        await websocket.close()
        return
    
    if algorithm == "Logistic Regression": dataset_id = str(int(dataset_id) + 3)
    if algorithm == "K-Means Clustering": dataset_id = str(int(dataset_id) + 6)

    data = datasets[dataset_id]

    X, y = data["X"], data.get("y")
    print(algorithm)
    if algorithm == "Linear Regression":
        await run_linear_regression(X, y, websocket, epochs, degree)
    elif algorithm == "Logistic Regression":
        await run_logistic_regression(X, y, websocket, epochs)
    elif algorithm == "K-Means Clustering":
        await run_kmeans(X, websocket, epochs, k)
    elif algorithm == "Ridge Regression":
        await run_ridge_regression(X, y, websocket, epochs)
    elif algorithm == "Lasso Regression":
        await run_lasso_regression(X, y, websocket, epochs)
    else:
        await websocket.send_text(json.dumps({"error": "Invalid algorithm"}))
    await websocket.close()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)