

export default {

  list(data, suc, err) {
    return {
      code:10000000,
      data: {
        list: [
          { memberId: 1, memberName: 'XING' }
        ]
      }
    };
  },


}
