import React from 'react';

function Criptomoneda ({criptomoneda}) {

    const {FullName, Name } = criptomoneda.CoinInfo;
    return(
        
        <option value={Name}>{FullName}</option>
    )

}

export default Criptomoneda;