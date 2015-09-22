var findDorisGriffin = function( $value ){
    var i = 0, j = $value.length, _chkId;

    (function next(){
        if(i < j){
            var arg = $value[i++],
                parentNext = function( $id, $i , $j ) {
                    var relationNext = function($$id, $k, $l) {
                        if($k < $l){
                            var rArg = rArgs[$k++];
                            if( rArg.first_name === 'Doris' && rArg.last_name === "Griffin" ){
                                rArg.id = $$id;
                                _chkId = (i - 1);
                            }
                            relationNext( $$id, $k, $l );
                        }
                    };
                    if($i < $j){
                        var arg = $value[i++],
                            rArgs = arg.relation;

                        relationNext($id, 0, rArgs.length);
                        parentNext( $id, $i, $j )
                    }
                };


            if( arg.first_name === 'Doris' && arg.last_name === "Griffin" ){
                return parentNext(arg.id , 0 , $value.length);
            }
            next();
        }
    })();

}