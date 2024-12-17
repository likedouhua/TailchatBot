module.exports = {
    type: "object",
    properties: {
      subscribeId: { type: "string" },
      text: { type: "string" },
      type: { type: "string", enum: ["jenkins"] },
      messageId: { type: "number" }
    },
    required: ["subscribeId", "text", "type", "messageId"],
    additionalProperties: false
  };