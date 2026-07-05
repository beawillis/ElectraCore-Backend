# ElectraCore ML Placeholder

The backend currently uses `baseline_rules` for prediction. This is intentional
until enough real transformer sensor history is collected.

Future ML workflow:

1. Export MongoDB sensor readings to `src/ml/datasets/sensor_history.csv`.
2. Train an IsolationForest anomaly model in Colab or locally.
3. Save the trained model as `src/ml/models/anomaly_model.pkl`.
4. Replace or extend `predict.py` so Node.js can call the trained model.

Relay protection should remain rule-based. ML should provide early warning,
risk scoring, and maintenance recommendations.
