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
            created_on: { type: "string", format: "date-time" },
            updated_on: { type: "string", format: "date-time" },
            closed_on: { type: ["string", "null"], format: "date-time" },
            root_id: { type: "integer" },
            parent_id: { type: ["integer", "null"] },
            done_ratio: { type: "integer", minimum: 0, maximum: 100 },
            start_date: { type: "string", format: "date" },
            due_date: { type: ["string", "null"], format: "date" },
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
          required: ["id", "subject", "description", "created_on", "updated_on"]
        },
        journal: {
          type: "object",
          properties: {
            id: { type: "integer" },
            notes: { type: "string" },
            created_on: { type: "string", format: "date-time" },
            private_notes: { type: "boolean" },
            author: { type: "object" },
            details: { type: "array" }
          },
          required: ["id", "created_on"]
        },
        url: { type: "string", format: "uri" }
      },
      required: ["action", "issue", "journal", "url"]
    }
  },
  required: ["payload"]
};