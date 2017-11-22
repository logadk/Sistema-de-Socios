<div class="container">
    <div class="row">
        <!-- Inicio Modal Editar Egresos-->
        <div class="modal fade" id="modal_so_busca" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="modal_so_titulo"></h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <div class="col-xs-8">
                                    <select class="form-control" id="sel_socio">
                                    <option>Socio Activo</option>
                                    <option>Socio Transeunte</option>
                                    <option>Familiar Activo</option>
                                    <option>Familiar Transeunte</option>                                    
                                </select>
                                </div>                                                               
                            </div>
                        </form>
                        <table class="table table-striped display" id="so_tabla">
                            <thead>
                                <tr>
                                    <th>Rut</th>
                                    <th>Nombre</th>                        
                                </tr>
                            </thead>
                            <tbody id="so_tbody">
                                
                            </tbody>                                                                                          
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal" title="Cerrar"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal Editar Egresos -->
    </div>
</div>
