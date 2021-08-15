import React from 'react';

import Concert from './../Concert/Concert';

const Concerts = ({ concerts }) => (
  <section>
    {concerts.map(con => <Concert key={con.id} {...con} />)}
    {console.log(concerts)}
  </section>
)

export default Concerts;