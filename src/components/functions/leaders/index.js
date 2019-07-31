export const getLeaders = categories => {
  for (let i = 0; i < categories.length; i++) {
    let tmp = [];
    categories[i][0].map((d, i) => {
      if (i < 5) {
        tmp = [...tmp, d];
      }
      return tmp;
    });

    categories[i][1](tmp);
  }
};