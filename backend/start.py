"""
Startup script for the api
"""

import uvicorn
import os
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent))

if __name__ == "__main__":
    port = int(os.getenv("PORT",8001))
    host = os.getenv("HOST","0.0.0.0")

    print(f"Starting Flood Detection Backend API on {host}:{port}")
    print("API documentation will be available at:")
    print(f"  -Swagger UI:http://{host}:{port}/docs")
    print(f"  -ReDoc http://{host}:{port}/redoc")
    print(f"  -OpenAPI JSON :http://{host}:{port}/openapi.json")


    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )
