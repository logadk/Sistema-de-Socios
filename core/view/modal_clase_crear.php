<div class="container">
    <div class="row">
        <!-- Inicio Modal Editar Egresos-->
        <div class="modal fade" id="modal_clase_crear" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Crear Clase</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Inicio</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="time" id="mcc_inicio" required>
                                </div>              
                            </div>
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Termino</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="time" placeholder="Termino" required id="mcc_termino">
                                </div>              
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Cupos</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="number" placeholder="Cupos" id="mcc_cupos" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Fecha</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="date" placeholder="Fecha" required id="mcc_fecha">
                                </div>
                            </div>                 
                            <table class="table table-striped display" id="mcc_tabla">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>Inicio</th>
                                        <th>Termino</th>
                                        <th>Cupos</th>
                                    </tr>
                                </thead>
                                <tbody id="mcc_tbody">

                                </tbody>                                                                                             
                            </table>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div class="col-xs-offset-6 col-xs-6">
                            <button type="button" class="btn btn-primary" title="Guardar" id="mcc_guardar" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span></button>
                            <button type="button" class="btn btn-primary invi"  title="Editar" id="mcc_editar" ><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" id="mcc_cerrar" title="Cerrar"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></button>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal Editar Egresos -->
    </div>
</div>
