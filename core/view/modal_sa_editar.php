<div class="container">
    <div class="row">
        <!-- Inicio Modal Editar Egresos-->
        <div class="modal fade" id="modal_socio_activo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Editar Socio Activo</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Rut</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="text" id="msa_rut" disabled>
                                </div>              
                            </div>
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Nombres</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="text" placeholder="Nombres" required id="msa_nombres">
                                </div>              
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Sexo</label>
                                <div class="col-xs-10">
                                    <select class="form-control" id="msa_sexo">
                                        <option>Masculino</option>
                                        <option>Femenino</option>
                                    </select>
                                </div>   
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Nacimiento</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="date" placeholder="Nacimiento" required id="msa_nacimiento">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">N° Título</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="number" placeholder="Título" id="msa_titulo">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Dpto/Casa</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="text" placeholder="Dpto/Casa" required id="msa_dpto">
                                </div>
                            </div>
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Celular</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="number" placeholder="Celular" id="msa_celu">
                                </div>                        
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Email</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="email" placeholder="Email" id="msa_email">
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="col-xs-2 control-label">Estado</label>
                                <div class="col-xs-10">
                                    <select class="form-control" id="msa_estado">
                                        <option value="activo">Activo</option>
                                        <option value="bloqueado">Bloqueado</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" title="Resetear Contraseña" id="sa_reset_pass" ><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>
                        <button type="button" class="btn btn-primary"  title="Editar" id="sa_editar" ><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" title="Cerrar"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal Editar Egresos -->
    </div>
</div>
