<div class="container">
    <div class="row">
        <!-- Inicio Modal Editar Egresos-->
        <div class="modal fade" id="modal_reserva_cancha" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Reserva Rancha</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Rut</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="text" placeholder="Rut" id="mrc_rut" disabled>
                                </div>              
                            </div>
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Nombres</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="text" placeholder="Nombres" required id="mrc_nombres" disabled>
                                </div>              
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Socio</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="text" placeholder="Socio" id="mrc_socio" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Periodo</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="number" placeholder="Periodo" id="mrc_periodo" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Cancha</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="text" placeholder="Cancha" required id="mrc_cancha" disabled>
                                </div>
                            </div>
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Fecha</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="date" placeholder="dd/mm/aaaa" id="mrc_fecha" disabled>
                                </div>                        
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Valor</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="number" placeholder="Valor" id="mrc_valor" disabled="">
                                </div>
                            </div>                            
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" title="Guardar" id="mrc_guardar" ><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span></button>
                        <button type="button" class="btn btn-primary" title="Eliminar" id="mrc_eliminar" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" title="Cerrar"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal Editar Egresos -->
    </div>
</div>
