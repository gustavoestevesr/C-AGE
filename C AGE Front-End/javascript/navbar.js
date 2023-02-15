document.querySelector("#navbar").innerHTML =
`<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="principal.html">
            <img src="midias/icone.png" alt="" width="30" height="30" class="d-inline-block align-text-top">
            C AGE
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="principal.html">Início</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Paciente
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="meus_dados.html">Meus Dados</a></li>
                        <li><a class="dropdown-item" href="minha_anamnese.html">Minha Anamnese</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Acompanhamento
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="meus_comentarios.html">Meus Comentários</a></li>
                        <li><a class="dropdown-item" href="minhas_consultas.html">Minhas Consultas</a></li>
                        <li><a class="dropdown-item" href="minhas_intercorrencias.html">Minhas Intercorrências</a>
                        </li>
                        <li><a class="dropdown-item" href="visao_geral.html">Visão Geral</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Emergência
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="registrar_intercorrencia.html">Registrar
                                Intercorrência</a></li>
                        <li><a class="dropdown-item" href="contato_emergencia.html">Contato de Emergência</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Suporte
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="FAQs.html">FAQs</a></li>
                        <li><a class="dropdown-item" href="ajuda.html">Ajuda</a></li>
                        <li><a class="dropdown-item" href="feedback.html">Feedback</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="index.html">Sair</a>
                </li>
            </ul>
        </div>
    </div>
</nav>`