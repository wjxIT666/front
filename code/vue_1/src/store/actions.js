import axios from 'axios';

export default {
    getDZ (context) {
        axios({
            method: 'GET',
            url: '/api/getInterface'
        }).then( res => {
            context.commit('setDZ', res.data.data);
        } );
    }
}