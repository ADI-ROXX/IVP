export const types = ["Regression", "Classification", "Clustering"] as const;

export type ModelType = (typeof types)[number];

export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
}

export const models: Model<ModelType>[] = [
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "Linear Regression",
    description:
      "A fundamental regression algorithm that models the relationship between variables by fitting a linear equation to the observed data.",
    type: "Regression",
    strengths:
      "Simple to implement, easily interpretable, works well for linear relationships, baseline for complex problems",
  },
  {
    id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
    name: "Ridge Regression",
    description:
      "Linear regression with L2 regularization to prevent overfitting.",
    type: "Regression",
    strengths:
      "Handles multicollinearity, reduces model complexity, prevents overfitting",
  },
  {
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: "Lasso Regression",
    description:
      "Linear regression with L1 regularization for feature selection.",
    type: "Regression",
    strengths:
      "Feature selection, sparse solutions, handles high-dimensional data",
  },
  {
    id: "be638fb1-973b-4471-a49c-290325085802",
    name: "Logistic Regression",
    description:
      "A regression model for binary classification problems, using a logistic function to model probability.",
    type: "Classification",
    strengths:
      "Binary classification, probability estimation, simple to implement, highly interpretable",
  },
  {
    id: "b43c0ea9-5ad4-456a-ae29-26cd77b6d0fb",
    name: "K-Means Clustering",
    description:
      "An unsupervised learning algorithm that partitions data into K distinct clusters based on feature similarity.",
    type: "Clustering",
    strengths:
      "Customer segmentation, pattern recognition, data grouping, market segmentation",
  },
];
