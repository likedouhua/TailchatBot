module.exports = {
    type: "object",
    properties: {
      converseId: { type: "string" },
      text: { type: "string" },
      type: { type: "string", enum: ["jenkins"] },
    },
    required: ["converseId", "text", "type"],
    additionalProperties: false
  };