<div class="container">
    <div class="row">
        <!-- Inicio Modal Editar Egresos-->
        <div class="modal fade" id="modal_agregar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form class="form-horizontal" action="" onsubmit="agregar(); return false">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="modalagregar_titulo"></h4>
                    </div>
                    <div class="modal-body">                        
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Rut</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="text" placeholder="Rut" id="agregar_rut" required>
                                </div>              
                            </div>
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Nombres</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="text" placeholder="Nombres" required id="agregar_nombres">
                                </div>              
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Parentesco</label>
                                <div class="col-xs-10">
                                    <select class="form-control" id="sel_parentesco">                                        
                                        <option>Padre</option>
                                        <option>Madre</option>
                                        <option>Conyuge</option>
                                        <option>Hijo</option>
                                        <option>Hija</option>
                                    </select>
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
                                    <input class="form-control" type="date" placeholder="Fecha Nacimiento" required id="agregar_fecha">
                                </div>
                            </div>                            
                             <div class="form-group">
                                <label class="col-xs-2 control-label">Estado</label>
                                <div class="col-xs-10">
                                    <select class="form-control" id="agregar_estado">
                                        <option value="activo">Activo</option>
                                        <option value="bloqueado">Bloqueado</option>
                                    </select>
                                </div>
                            </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary"  title="Guardar" id="agregar_guardar" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span></button>
                        <button type="button" class="btn btn-primary invi" title="Resetear Contraseña" id="agregar_reset_pass" ><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>
                        <button type="button" class="btn btn-primary invi"  title="Editar" id="agregar_editar" ><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" title="Cerrar"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></button>
                    </div>
                    </form>    
                </div>
            </div>
        </div>
        <!-- Fin Modal Editar Egresos -->
    </div>
</div>
