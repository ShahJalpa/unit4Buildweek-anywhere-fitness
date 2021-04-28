
exports.seed = function(knex) {
      return knex('users').insert([
        {username: 'admin', 
          password: '$2a$08$H2sAUr9xLEkRp5yhG5QOcuifHj./JH/L67NinBmVo3U.XtSbH.ksS', 
          name: 'adminadmin', 
          email:'admin@gmail.com', 
          role: 'client'}
      ]);
};
