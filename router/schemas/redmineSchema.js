module.exports = {
    type: "object",
    properties: {
      payload: {
        type: "object",
        properties: {
          action: { type: "string" },
          issue: {
            type: "object",
            properties: {
              id: { type: "number" },
              subject: { type: "string" },
              description: { type: "string" }
            },
            required: ["id", "subject", "description"],
            additionalProperties: false
          },
        },
        required: ["action", "issue"],
        additionalProperties: false
      },
      type: { type: "string", enum: ["redmine"], default: "redmine" }
    },
    required: ["payload"],
    additionalProperties: false
  };