module.exports = {
    type: "object",
    properties: {
      converseId: { type: "string" },
      text: { type: "string" },
      type: { type: "string", enum: ["jenkins"] },
      enableGroup: { type: "bool" }
    },
    required: ["converseId", "text", "type", "enableGroup"],
    additionalProperties: false
  };