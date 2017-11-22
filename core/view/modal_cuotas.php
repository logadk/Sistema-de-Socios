<div class="container">
    <div class="row">
        <!-- Inicio Modal Editar Egresos-->
        <div class="modal fade" id="modal_editar_cuotas" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Editar cuotas</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Nombre</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="text" id="mec_nombre" required="">
                                </div>              
                            </div>
                            <div class="form-group">                                
                                <label class="col-xs-2 control-label">Descripción</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="text" placeholder="Descripción" id="mec_descrip">
                                </div>              
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Fecha</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="date" id="mec_fecha" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">Valor</label>
                                <div class="col-xs-10">
                                    <input class="form-control" type="number" placeholder="Valor"required="" id="mec_valor" disabled>
                                </div>
                            </div>                           
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div class="col-xs-offset-6 col-xs-6">                            
                            <button type="button" class="btn btn-primary"  title="Editar" id="mec_editar" ><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
                            <button type="button" class="btn btn-danger" title="Eliminar" id="mec_eliminar" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" id="mec_cerrar" title="Cerrar"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></button>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal Editar Egresos -->
    </div>
</div>
