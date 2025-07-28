import json
import re
from google import genai
from google.genai import types
from app.src.config import settings

API_KEY = settings.gemini_api_key
MODEL_NAME = settings.gemini_model

def generate(prompt: str) -> str:
    client = genai.Client(api_key=API_KEY)
    model = MODEL_NAME

    prompt_instruction = """
You are a structured survey generator. You always respond ONLY in valid JSON format.
Analyze the user input and generate a survey based on it. Use the same language as the input (Indonesian, English, or mixed).
Return your response in this exact JSON format:

{
    "judul": string,                        // Survey title
    "deskripsi": string,                    // Short description
    "jumlah_responden": integer,            // Number of expected respondents (default = 100)
    "kriteria": {                           // Optional targeting (leave empty if not mentioned)
        "usia": [integer],                  // Age range as array (e.g. [18,19,20])
        "region": [string],                 // Location(s), e.g. ["Jakarta", "Bandung"]
        "status": [string],                 // e.g. ["Mahasiswa", "Karyawan"]
        "jenis_kelamin": string             // "laki laki" or "perempuan"
    },
    "PertanyaanSurvei": [                   // List of questions (default = 5 if not stated, max items = 25)
        {
            "teks_pertanyaan": string,
            "tipe_pertanyaan": string,      // One of: "pilihan_ganda", "essay", "checkbox", "dropdown", "skala"
            "opsi": [string]                // Answer options (empty array if essay)
        }
    ]
}

If the request is inappropriate or irrelevant, respond with:
{ "error": "..." }

Rules:
- Do not respond in plain text.
- Only output valid JSON.
- Follow the language of the user input.
""".strip()

    full_prompt = f"{prompt_instruction}\n\nInput: {prompt}\nOutput:"
    part = types.Part.from_text(text=full_prompt)

    contents = [
        types.Content(
            role="user",
            parts=[part]
        )
    ]

    tools = [
        types.Tool(google_search=types.GoogleSearch()),
    ]

    generate_content_config = types.GenerateContentConfig(
        temperature=1,
        top_p=1,
        seed=0,
        max_output_tokens=4096,
        safety_settings=[
            types.SafetySetting(
                category="HARM_CATEGORY_HATE_SPEECH",
                threshold="BLOCK_MEDIUM_AND_ABOVE"
            ),
            types.SafetySetting(
                category="HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold="BLOCK_MEDIUM_AND_ABOVE"
            ),
            types.SafetySetting(
                category="HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold="BLOCK_MEDIUM_AND_ABOVE"
            ),
            types.SafetySetting(
                category="HARM_CATEGORY_HARASSMENT",
                threshold="BLOCK_MEDIUM_AND_ABOVE"
            )
        ],
        tools=tools,
        thinking_config=types.ThinkingConfig(
            thinking_budget=-1,
        ),
    )

    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=generate_content_config
    )

    raw_response = response.text.strip()

    if raw_response.startswith("```json"):
        raw_response = re.sub(r"^```json\s*|\s*```$", "", raw_response, flags=re.MULTILINE)

    try:
        parsed = json.loads(raw_response)
        return parsed
    except json.JSONDecodeError as e:
        return {"error": f"Gagal parse JSON dari model: {str(e)}", "raw": raw_response}
