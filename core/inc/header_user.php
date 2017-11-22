<header>
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-1">
                    <span class="sr-only">Menú</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="<?php Config::ruta(); ?>?accion=panelusuario" class="navbar-brand">Puntilla</a>
            </div>
            <div class="collapse navbar-collapse" id="navbar-1">
                <ul class="nav navbar-nav navbar-right">                    
                    <li>
                        <a href="<?php Config::ruta(); ?>?accion=ucancha">Canchas</a>                        
                    </li>
                    <li>
                        <a href="<?php Config::ruta(); ?>?accion=ucursos">Cursos</a>                        
                    </li>                
                    <li>
                        <a href="<?php Config::ruta(); ?>?accion=ucompetencias">Competencias</a>
                    </li>
                    <li >  
                        <a href="<?php Config::ruta(); ?>?accion=salir"><button type="button" class="btn btn-xs btn-danger" title="Salir">&nbsp;<span class="glyphicon glyphicon-log-out"></span>&nbsp;</button></a>                        
                    </li>
                </ul>
            </div>
        </div>            
    </nav>
</header>

