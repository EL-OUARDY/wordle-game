import os
import json


def filter_five_letter_words(input_path: str):
    # file exists?
    if not os.path.exists(input_path):
        print(f"❌ File not found in: {input_path}")
        return

    try:
        # load input json file
        with open(input_path, "r", encoding="utf-8") as f:
            words = json.load(f)

        # filter
        five_letters = [w for w in words if isinstance(w, str) and len(w) == 5]

        # save in /output directory with same name
        os.makedirs("output", exist_ok=True)
        with open(f"output/{input_path}", "w", encoding="utf-8") as f:
            json.dump(five_letters, f, indent=2)

    except Exception as e:
        print(f"❌ Error: {e}")


filter_five_letter_words("words.json")


print("🧩 DONE!")
