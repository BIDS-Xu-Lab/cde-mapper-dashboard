import { config } from "tailwindcss-primeui";
import * as toolbox from "./toolbox";

export const ai_helper = {

    default_config: {
        model_name: "gpt-4o-mini",
        temperature: 0.7,
        endpoint: "https://api.openai.com/v1/chat/completions",
        system_prompt: "You are a helpful assistant that helps people with their questions. You can answer questions about any topic.",
    },

    chat: async function(message, config={}) {
        console.log(`* asking openai ...`);
        // e.g., "endpoint": "https://api.openai.com/v1/chat/completions",
        let endpoint = config.endpoint? config.endpoint: ai_helper.default_config.endpoint;

        // e.g., "model_name": "gpt-4o-mini",
        let model_name = config.model_name? config.model_name: ai_helper.default_config.model_name;

        // customize header
        let headers = {
            'Content-Type': 'application/json',
        };
        if (config.api_key != null) {
            headers['Authorization'] = `Bearer ${config.api_key}`;
        }

        // send request
        const rsp = await fetch(
            endpoint,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    "model": model_name,
                    "format": "json",
                    "temperature": config.temperature? config.temperature: ai_helper.default_config.temperature,
                    "response_format": {
                        "type": "json_object",
                    },
                    "messages": [
                    {
                        "role": "system",
                        "content": config.system_prompt? config.system_prompt: ai_helper.default_config.system_prompt
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                    ]
                })
            }
        );

        const data = await rsp.json();

        let s = data.choices[0].message.content;
        let result = JSON.parse(s);
        console.log("* openai result: ", result);

        // generate the return value
        let ret = {
            result: result,
            raw: data
            // raw: s.replace(/\n/g, " ")
        };
        return ret;
    },


}