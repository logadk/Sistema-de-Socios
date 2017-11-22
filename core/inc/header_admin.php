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
                <a href="<?php Config::ruta(); ?>?accion=paneladmin" class="navbar-brand">Puntilla</a>
            </div>
            <div class="collapse navbar-collapse" id="navbar-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Socios <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=socioa">Socio Activo</a>
                            </li>
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=fsocioa">Familiar Socio Activo</a>
                            </li>
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=sociot">Socio Transeúnte</a>
                            </li>
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=fsociot">Familiar Socio Transeúnte</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Canchas <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=icancha">Ingreso Canchas</a>
                            </li>
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=rcancha">Reserva Canchas</a>
                            </li>                                
                        </ul>
                    </li>
                    <li>                           
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Cursos <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=cursos">Ingreso Cursos</a>
                            </li>
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=rclases">Inscripción Cursos</a>
                            </li>                                
                        </ul>
                    </li>                
                    <li>
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Competencias <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=icompetencias">Ingreso Competencias</a>
                            </li>
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=rcompetencias">Inscripción Competencias</a>
                            </li>                                
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Cuotas Sociales <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=Cuotascs">Crear Cuotas Sociales</a>
                            </li>
                            <li>
                                <a href="<?php Config::ruta(); ?>?accion=Pagoscs">Pagos Cuotas Sociales</a>
                            </li>                                
                        </ul>
                    </li>
                    <li>
                        <a href="<?php Config::ruta(); ?>?accion=reportes" role="button">Reportes</a>                        
                    </li>
                    <li >  
                        <a href="<?php Config::ruta(); ?>?accion=salir"><button type="button" class="btn btn-xs btn-danger" title="Salir">&nbsp;<span class="glyphicon glyphicon-log-out"></span>&nbsp;</button></a>                        
                    </li>
                </ul>
            </div>
        </div>            
    </nav>
</header>

