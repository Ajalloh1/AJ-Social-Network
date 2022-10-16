const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const messageSchema = new Schema(
    {
      messageText: {
        type: String,
        required: [
          true,
          'You must enter a message between 1 - 250 characters.',
        ],
        maxlength: 250,
        minlength: 1,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
          return new Intl.DateFormat('en-US', {
            dateStyle: 'full',
            timeStyle: 'short',
          }).format(date);
        },
      },
    username: {
        type: String,
        required: [true, 'You must provide a username.'],
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: false,
    }
  );



  //getting all reaction message and responses//

  messageSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  const Thought = model('thought', messageSchema);
  
  module.exports = Thought;