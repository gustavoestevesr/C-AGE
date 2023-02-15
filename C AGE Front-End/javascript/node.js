async function displayStatusInBg(status) {
    if (status === "perfeito") {
        document.querySelector("body#status").style.backgroundImage = "linear-gradient(to bottom, rgb(21,115,71) , lightgreen)";
        document.querySelector('p#status_description').innerHTML = "Parabéns, seus exames encontram-se<br>dentro dos parâmetros normais de referência! :)"
    } else if (status === "alerta") {
        document.querySelector("body#status").style.backgroundImage = "linear-gradient(to bottom, rgb(255,193,7) , lightgoldenrodyellow)";
        document.querySelector('p#status_description').innerHTML = "Atenção, seus exames encontram-se<br>fora dos parâmetros normais de referência! :/"
    } else if (status === "perigo") {
        document.querySelector("body#status").style.backgroundImage = "linear-gradient(to bottom, rgb(220,53,69) , lightcoral)";
        document.querySelector('p#status_description').innerHTML = "Alerta, seus exames encontram-se<br>alterados! :("
    } else {
        document.querySelector("body#status").style.backgroundImage = "linear-gradient(to bottom, rgb(21,115,71) , lightgreen)";
        document.querySelector('p#status_description').innerHTML = "Parabéns, seus exames encontram-se<br>dentro dos parâmetros normais de referência! :)"
    }
}

async function LoginElderly() {
    // manter o mesmo nome das propriedades das requests
    const susNumber = document.querySelector('#inputSUSNumberLogin').value
    const password = document.querySelector('#inputElderlyPasswordLogin').value
    // validar se os dados são vazios
    if (susNumber.trim().length === 0 || password.trim().length === 0) {
        alert('Preencha todos os dados, por favor')
    } else {
        // realizar chamada a API
        const res = await fetch('http://localhost:3000/auth/elderly/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                susNumber,
                password
            }),
        })
        // verificar o status de retorno
        if (res.status === 200) {
            let info = await res.json()
            saveTokenLocalStorage(info.token)
            saveIDLocalStorage(info.elderly._id)
            window.location.href = 'principal.html'
        } else {
            alert('Usuário ou senha incorretos, tente novamente')
        }
    }
}

async function RegisterElderly() {
    // manter o mesmo nome das propriedades das requests
    const name = document.querySelector('#inputElderlyNameRegister').value
    const susNumber = document.querySelector('#inputSUSNumberRegister').value
    const password = document.querySelector('#inputElderlyPasswordRegister').value
    const password2 = document.querySelector('#inputElderlyPasswordRegister2').value

    if (name.trim().length === 0 || susNumber.trim().length === 0 || password.trim().length === 0 || password2.trim().length === 0) {
        alert('Preencha todos os dados, por favor')
    } else if (password.trim() != password2.trim()) {
        alert('As senhas não são iguais, digite novamente')
    } else {
        const res = await fetch('http://localhost:3000/auth/elderly/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                susNumber,
                password,
            }),
        })

        if (res.status === 200) {
            alert('Cadastro realizado com sucesso!')
            window.location.href = 'index.html'
        } else {
            alert('Não foi possível cadastrar a conta, tente novamente')
        }
    }
}

async function LoginDoctor() {
    // manter o mesmo nome das propriedades das requests
    const doctorNumber = document.querySelector('#inputDoctorNumberLogin').value
    const password = document.querySelector('#inputDoctorPasswordLogin').value
    // validar se os dados são vazios
    if (doctorNumber.trim().length === 0 || password.trim().length === 0) {
        alert('Preencha todos os dados, por favor')
    } else {
        // realizar chamada a API
        const res = await fetch('http://localhost:3000/auth/doctor/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                doctorNumber,
                password
            }),
        })
        // verificar o status de retorno
        if (res.status === 200) {
            let info = await res.json()
            saveTokenLocalStorage(info.token)
            saveIDLocalStorage(info.doctor._id)
            window.location.href = 'principal.html'
        } else {
            alert('Usuário ou senha incorretos, tente novamente')
        }
    }
}

async function RegisterDoctor() {
    // manter o mesmo nome das propriedades das requests
    const name = document.querySelector('#inputDoctorNameRegister').value
    const doctorNumber = document.querySelector('#inputDoctorNumberRegister').value
    const password = document.querySelector('#inputDoctorPasswordRegister').value
    const password2 = document.querySelector('#inputDoctorPasswordRegister2').value

    if (name.trim().length === 0 || doctorNumber.trim().length === 0 || password.trim().length === 0 || password2.trim().length === 0) {
        alert('Preencha todos os dados, por favor')
    } else if (password.trim() != password2.trim()) {
        alert('As senhas não são iguais, digite novamente')
    } else {
        const res = await fetch('http://localhost:3000/auth/doctor/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                doctorNumber,
                password,
            }),
        })

        if (res.status === 200) {
            alert('Cadastro realizado com sucesso!')
            window.location.href = 'index.html'
        } else {
            alert('Não foi possível cadastrar a conta, tente novamente')
        }
    }
}

function saveTokenLocalStorage(token) {
    localStorage.setItem("token", token);
}

function getTokenLocalStorage() {
    return localStorage.getItem("token");
}

function saveIDLocalStorage(id) {
    localStorage.setItem("id", id);
}

function getIDLocalStorage() {
    return localStorage.getItem("id");
}

async function getHome() {

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/elderlys/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()

        // console.log(info.elderly.emergencyContact)

        let status = (info.elderly.status == undefined) ? '' : info.elderly.status
        let name = (info.elderly.name == undefined) ? '' : info.elderly.name
        let emergencyName = (info.elderly.emergencyContact == undefined) ? '' : info.elderly.emergencyContact.emergencyName
        let emergencyPhone = (info.elderly.emergencyContact == undefined) ? '' : info.elderly.emergencyContact.emergencyPhone
        let bloodType = (info.elderly.bloodType == undefined) ? '' : info.elderly.bloodType
        let allergy = (info.elderly.allergy == undefined) ? '' : info.elderly.allergy

        displayStatusInBg(status)

        document.querySelector('#inputElderlyName').value = name
        document.querySelector('#inputElderlyEmergencyName').value = emergencyName
        document.querySelector('#inputElderlyEmergencyPhone').value = emergencyPhone
        document.querySelector('#inputElderlyBloodTypeElderly').value = bloodType
        document.querySelector('#InputElderlyAllergyElderly').value = allergy
    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }

}

async function getProfile() {

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/elderlys/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()

        //console.log(info.elderly)

        let name = (info.elderly.name == undefined) ? '' : info.elderly.name
        let email = (info.elderly.email == undefined) ? '' : info.elderly.email
        let phone = (info.elderly.phone == undefined) ? '' : info.elderly.phone
        let birthdayDate = (info.elderly.birthdayDate == undefined) ? '' : info.elderly.birthdayDate
        let susNumber = (info.elderly.susNumber == undefined) ? '' : info.elderly.susNumber
        let cep = (info.elderly.cep == undefined) ? '' : info.elderly.cep
        let number = (info.elderly.number == undefined) ? '' : info.elderly.number

        document.querySelector('#inputNameElderly').value = name
        document.querySelector('#inputEmailElderly').value = email
        document.querySelector('#inputPhoneElderly').value = phone
        document.querySelector('#inputBirthdayDateElderly').value = birthdayDate
        document.querySelector('#inputSUSNumber').value = 'xxx xxxx xxxx ' + susNumber
        document.querySelector('#inputCepElderly').value = cep
        document.querySelector('#inputNumberElderly').value = number

    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }

}

async function getAnamnese() {

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/elderlys/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()

        //console.log(info.elderly)

        let age = (info.elderly.age == undefined) ? '' : info.elderly.age
        let bloodType = (info.elderly.bloodType == undefined) ? '' : info.elderly.bloodType
        let allergy = (info.elderly.allergy == undefined) ? '' : info.elderly.allergy
        let continuousMedication = (info.elderly.continuousMedication == undefined) ? '' : info.elderly.continuousMedication
        let socialHabit = (info.elderly.socialHabit == undefined) ? '' : info.elderly.socialHabit

        document.querySelector('#inputElderlyAge').value = age
        document.querySelector('#inputElderlyBloodType').value = bloodType
        document.querySelector('#InputElderlyAllergy').value = allergy
        document.querySelector('#InputElderlyContinuousMedication').value = continuousMedication
        document.querySelector('#InputElderlySocialHabit').value = socialHabit

    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }

}

async function updateAnamnese() {
    // manter o mesmo nome das propriedades das requests
    const _age = document.querySelector('#inputElderlyAge').value
    const _bloodType = document.querySelector('#inputElderlyBloodType').value
    const _allergy = document.querySelector('#InputElderlyAllergy').value
    const _continuousMedication = document.querySelector('#InputElderlyContinuousMedication').value
    const _socialHabit = document.querySelector('#InputElderlySocialHabit').value

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/elderlys/anamnese/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        },
        body: JSON.stringify({
            _age,
            _bloodType,
            _allergy,
            _continuousMedication,
            _socialHabit,
        }),
    })

    if (res.status === 200) {
        alert('Cadastro atualizado com sucesso!')
        document.location.reload()
    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }
}


async function updateProfile() {
    // manter o mesmo nome das propriedades das requests
    const name = document.querySelector('#inputNameElderly').value
    const email = document.querySelector('#inputEmailElderly').value
    const phone = document.querySelector('#inputPhoneElderly').value
    const birthdayDate = document.querySelector('#inputBirthdayDateElderly').value
    const susNumber = document.querySelector('#inputSUSNumber').value
    const cep = document.querySelector('#inputCepElderly').value
    const number = document.querySelector('#inputNumberElderly').value

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/elderlys/profile/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        },
        body: JSON.stringify({
            name,
            email,
            phone,
            birthdayDate,
            susNumber,
            cep,
            number,
        }),
    })

    if (res.status === 200) {
        alert('Cadastro atualizado com sucesso!')
        document.location.reload()
    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }
}

async function updateIntercorrence() {
    // manter o mesmo nome das propriedades das requests
    const _intercorrenceTitle = document.querySelector('#InputIntercorrenceTitle').value
    const _intercorrenceDescription = 'asdasd'
    const _painLevel = document.querySelector('#SelectIntercorrencePainLevel').value
    const _intercorrenceDate = document.querySelector('#InputIntercorrenceDate').value

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/elderlys/intercorrences/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        },
        body: JSON.stringify({
            _intercorrenceTitle,
            _intercorrenceDescription,
            _painLevel,
            _intercorrenceDate,
        }),
    })

    if (res.status === 200) {
        alert('Cadastro atualizado com sucesso!')
        document.location.reload()
    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }
}

async function getIntercorrences() {
    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/elderlys/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()

        // limpando a tela, opcional
        document.querySelector('#tbody').innerHTML = ''

        info.elderly.intercorrences.forEach(intercorrence => {

            // formatting data in dd/mm/yyyy
            let day = intercorrence.createdAt.slice(8, 10)
            let month = intercorrence.createdAt.slice(5, 7)
            let year = intercorrence.createdAt.slice(0, 4)

            document.querySelector('#tbody').innerHTML +=
                `
                <tr>
                    <td class="datetime">${day}/${month}/${year}</td>
                    <td class="healthProfessional">${intercorrence.intercorrenceDescription}</td>
                    <td class="title">${intercorrence.intercorrenceTitle}</td>
                    <td class="description">${intercorrence.intercorrencePainLevel}</td>
                </tr>
                `
        });

    } else {
        alert('Erro em buscar os emblemas do usuário, tente novamente')
    }
}

async function getAppointments() {
    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/elderlys/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()

         console.log(info.elderly.appointments)

        // limpando a tela, opcional
        document.querySelector('#tbody').innerHTML = ''

        info.elderly.appointments.forEach(appointment => {
        // formatting data in dd/mm/yyyy
        let day = appointment.createdAt.slice(8, 10)
        let month = appointment.createdAt.slice(5, 7)
        let year = appointment.createdAt.slice(0, 4)

        
        document.querySelector('#tbody').innerHTML +=
            `
            <tr>
                <td class="datetime">${day}/${month}/${year}</td>
                    <td class="doctorName">${appointment.doctorName}</td>
                    <td class="healthProfessional">${appointment.appointmentDescription}</td>
                    <td class="title">${appointment.appointmentTitle}</td>                    
                </tr>
                `
        });

    } else {
        alert('Erro em buscar os emblemas do usuário, tente novamente')
    }
}


async function getEmergencyContact() {
    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/elderlys/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()

        //console.log(info.elderly.emergencyContact)       

        let emergencyName = (info.elderly.emergencyContact == undefined) ? '' : info.elderly.emergencyContact.emergencyName
        let emergencyEmail = (info.elderly.emergencyContact == undefined) ? '' : info.elderly.emergencyContact.emergencyEmail
        let emergencyPhone = (info.elderly.emergencyContact == undefined) ? '' : info.elderly.emergencyContact.emergencyPhone
        let emergencyCep = (info.elderly.emergencyContact == undefined) ? '' : info.elderly.emergencyContact.emergencyCep
        let emergencyNumber = (info.elderly.emergencyContact == undefined) ? '' : info.elderly.emergencyContact.emergencyNumber

        document.querySelector('#inputNameEmergencyElderly').value = emergencyName
        document.querySelector('#inputEmailEmergencyElderly').value = emergencyEmail
        document.querySelector('#inputPhoneEmergencyElderly').value = emergencyPhone
        document.querySelector('#inputCepEmergencyElderly').value = emergencyCep
        document.querySelector('#inputNumberEmergencyElderly').value = emergencyNumber

    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }
}

async function updateEmergencyContact() {
    // manter o mesmo nome das propriedades das requests
    const _emergencyName = document.querySelector('#inputNameEmergencyElderly').value
    const _emergencyEmail = document.querySelector('#inputEmailEmergencyElderly').value
    const _emergencyPhone = document.querySelector('#inputPhoneEmergencyElderly').value
    const _emergencyCep = document.querySelector('#inputCepEmergencyElderly').value
    const _emergencyNumber = document.querySelector('#inputNumberEmergencyElderly').value

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/elderlys/emergencyContact/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        },
        body: JSON.stringify({
            _emergencyName,
            _emergencyEmail,
            _emergencyPhone,
            _emergencyCep,
            _emergencyNumber,
        }),
    })

    if (res.status === 200) {
        alert('Cadastro atualizado com sucesso!')
        document.location.reload()
    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }
}

async function getComments() {
    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/elderlys/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()

        let comments = (info.elderly.comments == undefined) ? '' : info.elderly.comments

         console.log(info.elderly)

        // limpando a tela, opcional
        document.querySelector('.container').innerHTML = ''

        comments.forEach(element => {

            // formatting data in dd/mm/yyyy
            let day = element.createdAt.slice(8, 10)
            let month = element.createdAt.slice(5, 7)
            let year = element.createdAt.slice(0, 4)

            switch (element.tag) {
                case "1":
                    document.querySelector('.container').innerHTML +=
                    ` <div class="card text-white bg-success mb-3">
                            <div class="card-header">Profissional de saúde: ${element.doctorName}</div>
                            <div class="card-body">
                                <h5 class="card-title">${element.commentTitle}</h5>
                                <p class="card-text">${element.commentDescription}</p>
                            </div>
                            <div class="card-header">Data: ${day}/${month}/${year}</div>
                        </div>
                    `
                    break;

                    case "2":
                        document.querySelector('.container').innerHTML +=
                        ` <div class="card text-dark  bg-warning mb-3">
                                <div class="card-header">Profissional de saúde: ${element.doctorName}</div>
                                <div class="card-body">
                                    <h5 class="card-title">${element.commentTitle}</h5>
                                    <p class="card-text">${element.commentDescription}</p>
                                </div>
                                <div class="card-header">Data: ${day}/${month}/${year}</div>
                            </div>
                        `
                    break;

                    case "3":
                        document.querySelector('.container').innerHTML +=
                        ` <div class="card text-white bg-danger mb-3">
                                <div class="card-header">Profissional de saúde: ${element.doctorName}</div>
                                <div class="card-body">
                                    <h5 class="card-title">${element.commentTitle}</h5>
                                    <p class="card-text">${element.commentDescription}</p>
                                </div>
                                <div class="card-header">Data: ${day}/${month}/${year}</div>
                            </div>
                        `
                    break;
            
                default:
                    break;
            }
        });

    } else {
        alert('Erro em buscar os emblemas do usuário, tente novamente')
    }
}

async function ForgotPassword(){
    // manter o mesmo nome das propriedades das requests
    const email = document.querySelector('#emailUsuario').value

    const res = await fetch('http://localhost:3000/auth/forgot_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
        }),
    })

    if (res.status === 200) {
        alert('Token de confirmação enviado com sucesso!')
        window.location.href = 'resetPassword.html'
    } else {
        alert('Não foi possível enviar Token de confirmação, tente novamente')
    }
}

async function ResetPassword(){
    // manter o mesmo nome das propriedades das requests
    const email = document.querySelector('#emailUsuario').value
    const token = document.querySelector('#tokenUsuario').value
    const password = document.querySelector('#senhaUsuario').value
    const confirmPassword = document.querySelector('#confirmarSenhaUsuario').value

    if (password != confirmPassword) {
        alert('Senhas diferentes')
    } else {
        const res = await fetch('http://localhost:3000/auth/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({                
                email,
                token,
                password
            }),
        })

        if (res.status === 200) {
            alert('Senha alterada com sucesso!')
            window.location.href = 'index.html'
        } else {
            alert('Não foi possível alterar a senha da conta, tente novamente')
        }
    }
}


