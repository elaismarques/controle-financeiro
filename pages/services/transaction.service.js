const transactionService = {
    findByUser: () => {
      return callApi({
        method: "GET",
        url: "http://localhost:3000/transactions"
      })
    },
    findByUid: uid => {
         return callApi({
            method: "GET",
            url: `http://localhost:3000/transactions/${uid}`
          })
    },
    remove: transaction => {
        return callApi({
            method: "DELETE",
            url: `http://localhost:3000/transactions/${transaction.uid}`
          })
    },
    save: transaction => {
        return callApi({
            method: "POST",
            url: "http://localhost:3000/transactions",
            params: transaction
          })
    }, 
    update: transaction => {
        return callApi({
            method: "PATCH",
            url: `http://localhost:3000/transactions/${transaction.uid}`,
            params: transaction
          })
    }
}

function callApi({method, url, params}) {
    return new Promise(async (resolve, reject) => {
        // console.log(await firebase.auth().currentUser)
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.setRequestHeader('Authorization', await firebase.auth().currentUser.getIdToken());
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        
        xhr.onreadystatechange = function() {
            if(this.readyState == 4) {
                const json = JSON.parse(this.responseText);
                if(this.status != 200) {
                    reject(json);
                } else {
                    resolve(json);
                }
            }
        };

        xhr.send(JSON.stringify(params));
    });


}


// function callApi({ method, url, params }) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             // Função para obter o token de autenticação atualizado
//             const getIdTokenRefreshed = async () => {
//                 return new Promise(async (resolve, reject) => {
//                     const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
//                         unsubscribe();
//                         try {
//                             const refreshedToken = await user.getIdToken(true);
//                             resolve(refreshedToken);
//                         } catch (error) {
//                             console.error(error);
//                             reject(error);
//                         }
//                     });
//                 });
//             };

//             // Obter o token de autenticação atualizado
//             const token = await getIdTokenRefreshed();

//             console.log(token)

//             // Configurar o cabeçalho de autorização com o token atualizado
//             const xhr = new XMLHttpRequest();
//             xhr.open(method, url, true);
//             xhr.setRequestHeader('Authorization', `Bearer ${token}`);

//             // Configurar o cabeçalho Content-Type
//             xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

//             // Definir a função de retorno de chamada para manipular a resposta da API
//             xhr.onreadystatechange = function () {
//                 if (this.readyState == 4) {
//                     const json = JSON.parse(this.responseText);
//                     if (this.status != 200) {
//                         reject(json);
//                     } else {
//                         resolve(json);
//                     }
//                 }
//             };

//             // Enviar os parâmetros como dados da requisição
//             xhr.send(JSON.stringify(params));
//         } catch (error) {
//             reject(error);
//         }
//     });
// }


