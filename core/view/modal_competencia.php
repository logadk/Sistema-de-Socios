<div class="container">
    <div class="row">
        <!-- Inicio Modal Editar Egresos-->
        <div class="modal fade" id="modal_reserva_competencia" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Inscripción Competencia</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" action="" onsubmit="inscribe_competencia(); return false">
                            <div class="form-group">                                
                                <label class="col-xs-3 control-label">Competencia</label>
                                <div class="col-xs-9">
                                    <input class="form-control" type="text" placeholder="Competencias" required id="mrc_competencias" disabled>
                                </div>              
                            </div>
                            <div class="form-group">                                
                                <label class="col-xs-3 control-label">Rut</label>
                                <div class="col-xs-9">
                                    <input class="form-control" type="text" placeholder="Rut" required id="mrc_rut" disabled>
                                </div>              
                            </div>
                            <div class="form-group">                                
                                <label class="col-xs-3 control-label">Nombres</label>
                                <div class="col-xs-9">
                                    <input class="form-control" type="text" placeholder="Nombres" required id="mrc_nombres" disabled>
                                </div>              
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3  control-label">Sexo</label>
                                <div class="col-xs-9">
                                <select class="form-control" id="sel_sexo">
                                    <option>Masculino</option>
                                    <option>Femenino</option>                                    
                                </select>
                                </div>
                            </div>                            
                            <div class="form-group">
                                <label class="col-xs-3 control-label">Edad</label>
                                <div class="col-xs-9">
                                    <input class="form-control" type="number" placeholder="Edad" id="mrc_edad" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">Lugar</label>
                                <div class="col-xs-9">
                                    <input class="form-control" type="text" placeholder="Lugar" id="mrc_lugar">
                                </div>
                            </div>
                            <div class="form-group">                                
                                <label class="col-xs-3 control-label">Valor</label>
                                <div class="col-xs-9">
                                    <input class="form-control" type="number" placeholder="Valor" id="mrc_valor">
                                </div>                        
                            </div>
                            <div class="form-group">  
                                <div class="col-xs-6 col-sm-5">
                                    <button type="submit" class="btn btn-primary" title="Guardar" id="mrc_guardar" ><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span></button>
                                    <button type="button" class="btn btn-primary invi"  title="Editar" id="mrc_editar"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
                                    <button type="button" class="btn btn-danger invi"  title="Eliminar" id="mrc_eliminar"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal" title="Cerrar"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></button>
                                </div>             
                            </div> 
                        </form>
                    </div>
                    <div class="modal-footer">
                        <table class="table table-striped display" id="mrc_tabla">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombres</th>
                                    <th>Lugar</th>                                
                                </tr>
                            </thead>
                            <tbody id="mrc_tbody">
                                
                            </tbody>                                                                                        
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal Editar Egresos -->
    </div>
</div>
