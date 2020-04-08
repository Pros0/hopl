module.exports = {


  friendlyName: 'Me',


  description: 'Me users.',


  inputs: {

  },

  exits: {

  },

  fn: async function () {

    // All done.
    return this.req.user;
  }
};
