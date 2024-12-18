module.exports = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    type: { type: 'string'},
    converseId: { type: 'string'}
  },
  required: ['text', 'type', 'converseId']
};
