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
            id: { type: "integer" },
            subject: { type: "string" },
            description: { type: "string" },
            created_on: { type: "string" }, // 不再检查格式
            updated_on: { type: "string" }, // 不再检查格式
            closed_on: { type: ["string", "null"] },
            root_id: { type: "integer" },
            parent_id: { type: ["integer", "null"] },
            done_ratio: { type: "integer" },
            start_date: { type: "string" }, // 不再检查格式
            due_date: { type: ["string", "null"] },
            estimated_hours: { type: ["number", "null"] },
            is_private: { type: "boolean" },
            lock_version: { type: "integer" },
            custom_field_values: { type: "array" },
            project: { type: "object" },
            status: { type: "object" },
            tracker: { type: "object" },
            priority: { type: "object" },
            author: { type: "object" },
            assignee: { type: "object" },
            watchers: { type: "array" }
          },
          required: ["id", "subject", "description"]
        },
        journal: {
          type: "object",
          properties: {
            id: { type: "integer" },
            notes: { type: "string" },
            created_on: { type: "string" }, // 不再检查格式
            private_notes: { type: "boolean" },
            author: { type: "object" },
            details: { type: "array" }
          },
          required: ["id"]
        },
        url: { type: "string" } // 不再检查格式
      },
      required: ["action", "issue", "journal", "url"]
    }
  },
  required: ["payload"]
};