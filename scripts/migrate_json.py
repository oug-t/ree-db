import json
import os
import sqlite3


def migrate_data(json_path, db_path):
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return

    with open(json_path, "r") as f:
        data = json.load(f)

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS materials (pcd_id TEXT PRIMARY KEY, total_energy REAL, source_file TEXT)"
        )
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS crystal_field (material_id TEXT, parameter TEXT, value REAL)"
        )
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS atom_sites (material_id TEXT, symbol TEXT, x REAL, y REAL, z REAL)"
        )

        for pcd_id, content in data.items():
            cursor.execute(
                "INSERT OR REPLACE INTO materials VALUES (?, ?, ?)",
                (
                    pcd_id,
                    content.get("total_energy"),
                    content.get("energy_source_file"),
                ),
            )

            cf_params = content.get("crystal_field", {}).get("Akq_rk_meV", {})
            if cf_params:
                for key, val in cf_params.items():
                    cursor.execute(
                        "INSERT INTO crystal_field VALUES (?, ?, ?)", (pcd_id, key, val)
                    )

            struct = content.get("structure", {})
            symbols = struct.get("atom_symbols", [])
            positions = struct.get("atom_positions", [])

            for i in range(len(symbols)):
                pos = positions[i]
                cursor.execute(
                    "INSERT INTO atom_sites VALUES (?, ?, ?, ?, ?)",
                    (pcd_id, symbols[i], pos[0], pos[1], pos[2]),
                )

        conn.commit()
        print(f"Successfully migrated {len(data)} materials.")

    except Exception as e:
        conn.rollback()
        print(f"Migration failed: {e}")
    finally:
        conn.close()


migrate_data("cfp_dataset.json", "rare_earth.db")
