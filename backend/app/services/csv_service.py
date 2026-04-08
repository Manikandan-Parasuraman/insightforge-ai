import pandas as pd

def analyze_csv(file_path: str):
    df = pd.read_csv(file_path)

    insights = {
        "shape": {"rows": df.shape[0], "columns": df.shape[1]},
        "columns": list(df.columns),
        "missing_values": df.isnull().sum().to_dict(),
        "data_types": df.dtypes.astype(str).to_dict(),
        "summary_stats": df.describe(include="all").fillna("").to_dict()
    }

    return insights