<div class="container">
    <div class="row">
        <!-- Inicio Modal Editar Egresos-->
        <div class="modal fade" id="modal_transeunte" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form class="form-horizontal" action="" onsubmit="add_transeunte(); return false">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="modaltranseunte_titulo"></h4>
                    </div>
                    <div class="modal-body">                        
                        <div class="form-group">                                
                            <label class="col-xs-2 control-label">Rut</label>
                            <div class="col-xs-10">
                                <input id="st_rut" class="form-control" type="text" placeholder="Rut" required>
                            </div>                     
                        </div>
                        <div class="form-group">
                            <label class="col-xs-2 control-label">Nombres</label>
                            <div class="col-xs-10">
                                <input id="st_nombres" class="form-control" type="text" placeholder="Nombres" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-2 control-label">Celular</label>
                            <div class="col-xs-10">
                                <input id="st_cel" class="form-control" type="number" placeholder="Celular">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-2 control-label">Sexo</label>
                            <div class="col-xs-10">
                                <select class="form-control" id="sel_sexo">
                                    <option>Masculino</option>
                                    <option>Femenino</option>
                                </select>
                            </div>                           
                        </div>
                        <div class="form-group">
                            <label class="col-xs-2 control-label">Fecha Nacimiento</label>
                            <div class="col-xs-10">
                                <input id="st_nacimiento" class="form-control" type="date" placeholder="dd/mm/aaaa" required>
                            </div>
                        </div>
                        <div class="form-group">                     
                            <label class="col-xs-2 control-label">Email</label>
                            <div class="col-xs-10">
                                <input id="st_email" class="form-control" type="email" placeholder="Email">
                            </div>                            
                        </div>
                        <div class="form-group">
                            <label class="col-xs-2 control-label">Fecha Inicio</label>
                            <div class="col-xs-10">
                                <input id="st_inicio" class="form-control" type="date" placeholder="Fecha" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-2 control-label">Fecha Termino</label>
                            <div class="col-xs-10">
                                <input id="st_fin" class="form-control" type="date" placeholder="Fecha" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-2 control-label">Estado</label>
                            <div class="col-xs-10">
                                <select class="form-control" id="sel_estado">
                                    <option>activo</option>
                                    <option>bloqueado</option>
                                </select>
                            </div>                           
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary"  title="Guardar" id="st_guardar" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span></button>
                        <button type="button" class="btn btn-primary invi" title="Resetear Contraseña" id="st_reset_pass" ><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>
                        <button type="button" class="btn btn-primary invi"  title="Editar" id="st_editar" ><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" title="Cerrar"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></button>
                    </div>
                    </form>    
                </div>
            </div>
        </div>
        <!-- Fin Modal Editar Egresos -->
    </div>
</div>
