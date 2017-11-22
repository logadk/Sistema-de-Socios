<div class="container">
    <div class="row">
        <!-- Inicio Modal Editar Egresos-->
        <div class="modal fade" id="modal_participantes" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Participantes</h4>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped display" id="pa_tabla">
                            <thead>
                                <tr>
                                    <th>Rut</th>
                                    <th>Nombre</th>                        
                                </tr>
                            </thead>
                            <tbody id="pa_tbody">
                                
                            </tbody>                                                                                           
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" id="pa_guardar" title="Participar"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span></button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" title="Salir"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal Editar Egresos -->
    </div>
</div>
