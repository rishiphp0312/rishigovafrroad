var obj = $('#ClaimFlrIndexForm');
var commonPopupObj = $('#commonmessage');
$(obj).validate();

var objDate = new Date();

$(function() {

    $(obj).find("input[name *='dt_claim_from']").datepicker({
        maxDate: "0 D",
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        dateFormat: 'd M yy',
        onClose: function(selectedDate) {

            $(obj).find("input[name *='dt_claim_to']").datepicker("option", "minDate", selectedDate);
            $(this).trigger('blur');
        }


    });

    $(obj).find("input[name *='dt_claim_to']").datepicker({
        maxDate: "0 D",
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        dateFormat: 'd M yy',
        onClose: function(selectedDate) {

            $(obj).find("input[name *='dt_claim_from']").datepicker("option", "maxDate", selectedDate);

            $(this).trigger('blur');

        }

    });

    $(obj).find("input[name *='dt_claim_from']").each(function() {

        $(this).rules("add", {
            required: true,
            date: true,
            messages: {
                required: 'Required'


            }});


    });

    $(obj).find("input[name *='dt_claim_to']").each(function() {

        $(this).rules("add", {
            required: true,
            date: true,
            messages: {
                required: 'Required'


            }});
    });
	/*
	ClaimMultipleDOCID
	$(obj).find("button").().each(function() {

        $(this).rules("add", {
            required: true,
            date: true,
            messages: {
                required: 'Required'


            }});
    });
	*/
		
	 
	 $(obj).find("input[name *='vc_party_claim_no']").each(function() {

        $(this).rules("add", {
            
			required: true,
            
			maxlength: 20,
			
			alphanumeric:true,
			 remote: {
                    url: GLOBLA_PATH + "flr/claims/getFormCheck/",
                    type: "post",
					 data: {
							VcClaimFormNo :function(){
							
								return $('#ClaimHeaderVcPartyClaimNo').val();
							
							}
						} 
						
                }, 
            messages: {
				required: 'Required',
				maxlength	:	'Maximum 20 characters allowed',
				alphanumeric:	'Alphanumeric only',
				remote:   'Already Used'
            }});


    });

    /*function numberWithCommas(x) {
     var parts = x.toString().split(".");
     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     return parts.join(".");
     }*/
	 
    function totalamtdisplay(len) {

        var finalamt = parseFloat(0);
		
        for (var i = 0; i < len - 1; i++) {
        
     		var amountvalue = $('#ClaimDetail' + i + 'NuAmount').val();
     
        	 if (Number($.trim(amountvalue)) >= 0 && $.trim(amountvalue) != '' && $.trim(amountvalue) != null) {
        
               finalamt = parseFloat(finalamt) + parseFloat($.trim(amountvalue));
       
        	   } else {
               
			   var val = parseFloat(0);
                //alert('final-amt11-'+totalMt);
            }
            //alert('funct----'+finalamt);
        }
        finalamt = parseFloat(finalamt).toFixed(2);
        $('#showtotalamount_id').html(finalamt);
    }
	
	function checkInvoicedatefuelLitres(Rowid){
	             
				var litrescurrIndex = Rowid;
	             //litrescurrIndex = parseInt($(ObjLitres).index(element));
				ObjLitres           = $(element).parent().parent().parent().find("input[name*='nu_litres']");				
                
			
				if(litrescurrIndex >= 0){
				 
				var curentdatevalue         = $('#ClaimDetail'+litrescurrIndex+'DtInvoiceDate').val();
				var curentVcInvoiceNovalue  = $('#ClaimDetail'+litrescurrIndex+'VcInvoiceNo').val();
			    var curentVcOutletCodevalue = $('#ClaimDetail'+litrescurrIndex+'VcOutletCode').val();
				var todaydate = new Date();				
				
				if($('#ClaimDetail'+litrescurrIndex+'DtInvoiceDate').val()!=''){
				
                var curentdatevalueConvert = $('#ClaimDetail'+litrescurrIndex+'DtInvoiceDate').datepicker('getDate');
				noOfdays = Math.floor((todaydate.getTime() - curentdatevalueConvert.getTime()) / 86400000); // ms per day
				
				}
				
				if ($.trim($("#ClaimDetail" + litrescurrIndex + "NuLitres").val()) != null && !isNaN($.trim($("#ClaimDetail" + litrescurrIndex + "NuLitres").val())) && $.trim($("#ClaimDetail" + litrescurrIndex + "NuLitres").val()).length > 0)
				var curentNuLitresvalue = parseFloat($('#ClaimDetail'+litrescurrIndex+'NuLitres').val());
				else
				var curentNuLitresvalue = parseFloat(0);
				
				}
				//alert(litrescurrIndex);
				$(ObjLitres).each(function() {

		        runObjIndex = parseInt($(ObjLitres).index(this));
				notcurentVcInvoiceNovalue = $('#ClaimDetail'+runObjIndex+'VcInvoiceNo').val();
				notcurentdatevalue = $('#ClaimDetail'+runObjIndex+'DtInvoiceDate').val();
				notcurentVcOutletCodevalue = $('#ClaimDetail'+runObjIndex+'VcOutletCode').val();    
				
				
				if (litrescurrIndex != runObjIndex) {
					//	alert('thival--'+$(this).val());	
                  if (($.trim(notcurentVcOutletCodevalue) == $.trim(curentVcOutletCodevalue))
					&& ($.trim(notcurentdatevalue)==$.trim(curentdatevalue))
					&& ($.trim(notcurentVcInvoiceNovalue)==$.trim(curentVcInvoiceNovalue)) && 
					$.trim(curentVcInvoiceNovalue)!='' && 
					$.trim(curentVcOutletCodevalue)!='' &&
					$.trim(curentdatevalue)!=''
					) {
					
                    $("#ch_rejected_td_"+litrescurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
                    
					if(curentNuLitresvalue < 200 && noOfdays<90){
					
						$("#ClaimDetail" + litrescurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200');

					}else if(curentNuLitresvalue > 200 && noOfdays>90){
					
						$("#ClaimDetail" + litrescurrIndex + "VcReasons").val('Invoice already exsist. and Invoice older than 3 months.');
					
					}else if(curentNuLitresvalue < 200 && noOfdays>90){
					
						$("#ClaimDetail" + litrescurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200 and Invoice older than 3 months.');
					
					}
					
					else {
					console.log(curentNuLitresvalue+'==curentNuLitresvalue=='+curentVcOutletCodevalue+'==curentVcOutletCodevalue==curentdatevalue'+curentdatevalue+'==curentVcInvoiceNovalue--'+curentVcInvoiceNovalue);

						$("#ClaimDetail" + litrescurrIndex + "VcReasons").val('Invoice already exsist.');
					}
                    
					$("#ClaimDetail" + litrescurrIndex + "VcReasonsDiv").html('Invoice alr ....');
                    $("#showreason_id_" + litrescurrIndex).show();
						console.log('kisme1');
					
                     return false;

                    }else{
						console.log('kisme');
						$("#ch_rejected_td_" + litrescurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
						$("#ClaimDetail" + litrescurrIndex + "VcReasons").val('');
						$("#ClaimDetail" + litrescurrIndex + "VcReasonsDiv").html('');
						$("#showreason_id_" + litrescurrIndex).hide();
                       return true;						
					}

                    }	
				
				});
	}

    function setDatePicker() {

        var addobject = $(obj).find('.innerbody:eq(1)').find('table tbody');
        $(addobject).find("input[name*='dt_invoice_date']").datepicker({
            dateFormat: 'd M yy',
            defaultDate: "+1w",
            maxDate: "0 D",
            changeMonth: true,
            changeYear: true,
            numberOfMonths: 1,
            onSelect: function() {
			
                var noOfdays = 0;
				var invoicealreadycheck = true;

                var InvoiceDate = $(this).datepicker('getDate');
                var todaydate = new Date();
                noOfdays = Math.floor((todaydate.getTime() - InvoiceDate.getTime()) / 86400000); // ms per day
                var Rowid = parseInt($(this).attr('id').split("ClaimDetail")[1], 10);
                var ltrValue = parseFloat(0);
				
				/**********Start For the invoice unique check*************/
				$.ajax({
				type: "POST",
			    url: GLOBLA_PATH + "flr/claims/getAllInvoiceCheck/",
				data: {
				
				ClaimHeaderVcInvoicedate :function(){
				return $('#ClaimDetail'+Rowid+'DtInvoiceDate').val()
				},
				ClaimDetailVcInvoiceNo :function(){
				return $('#ClaimDetail'+Rowid+'VcInvoiceNo').val()
				},
				ClaimHeaderVcOutletCode :function(){						
				return $('#ClaimDetail'+Rowid+'VcOutletCode').val()
				}
				
				},			
				success : function (data) {
				//alert(data);
				if(data==false){
					invoicealreadycheck = false;	
				}
				/**********Start For the Rejection check cases *************/
					
                if ($.trim($("#ClaimDetail" + Rowid + "NuLitres").val()) != null && !isNaN($.trim($("#ClaimDetail" + Rowid + "NuLitres").val())) && $.trim($("#ClaimDetail" + Rowid + "NuLitres").val()).length > 0)
                    var ltrValue = parseFloat($("#ClaimDetail" + Rowid + "NuLitres").val());
                else
                    var ltrValue = parseFloat(0);			


                var nu_refund_prcn = $("#ClaimDetail" + Rowid + "NuRefundPrcnt").val();
                var nu_admin_fee_prcnt = $("#ClaimDetail" + Rowid + "NuAdminFeePrcnt").val();
                var nu_refund_rate = $("#ClaimDetail" + Rowid + "NuRefundRate").val();

                if (ltrValue < 200 || noOfdays > 90 || invoicealreadycheck==false ) {

                    var admin_fee = 0;
                    var amount    = 0;

                    $("#ClaimDetail" + Rowid + "NuAdminFee").val(admin_fee).trigger('blur');

                    $("#ClaimDetail" + Rowid + "NuAmount").val(amount).trigger('blur');

                }
                else {

                    var admin_fee = parseFloat(nu_admin_fee_prcnt * ltrValue).toFixed(2);
                    var amount    = parseFloat(nu_refund_rate * ltrValue).toFixed(2);

                    $("#ClaimDetail" + Rowid + "NuAdminFee").val(admin_fee).trigger('blur');
                    $("#ClaimDetail" + Rowid + "NuAmount").val(amount).trigger('blur');

                }

				
                var totalMt = parseFloat(0);

                $(this).parent().parent().parent().find("input[name *='[nu_amount]']").each(function() {

                    if (Number($.trim($(this).val())) >= 0 && $.trim($(this).val()) != '' && $.trim($(this).val()) != null) {

                        var val = parseFloat($.trim($(this).val()));
                        totalMt = parseFloat(totalMt) + parseFloat(val);
                        //alert('final-amt1222-'+totalMt);

                    } else {

                        var val = parseFloat(0);
                        //alert('final-amt11-'+totalMt);

                    }

                });

                totalMt = parseFloat(totalMt).toFixed(2);
                $('#showtotalamount_id').html(totalMt);
				
				console.log(invoicealreadycheck+'==invoicealreadycheck=-datepicer1=='+noOfdays+'==ltrValue=='+ltrValue);
				
				if(invoicealreadycheck == false){
				
					if (noOfdays > 90 && ltrValue > 200) {

                    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
					$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months and Invoice already exsist.');
                   	$("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice is ....');
                    $("#showreason_id_" + Rowid).show();

					}else if (noOfdays > 90 && ltrValue == 0) {
					
					$("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');			
					$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months and already exsist.');
                 	$("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice is...');
                    $("#showreason_id_" + Rowid).show();

                } else if (noOfdays > 90 && ltrValue < 200 && ltrValue != 0) {

                    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
					$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months & Fuel is less than 200 Ltrs. and Invoice already exsist.');                   				
					$("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice is....');
                    $("#showreason_id_" + Rowid).show();


                }
                else if (ltrValue < 200 && noOfdays < 90 && ltrValue != '') {

                    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
                    $("#ClaimDetail" + Rowid + "VcReasons").val('Fuel is less than 200 Ltrs. and invoice already exsist.');
                   	//$("#ClaimDetail" + Rowid + "VcReasons").val('Fuel is less than 200 Ltrs.');
                    $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Fuel is ....');
                    $("#showreason_id_" + Rowid).show();


                }else{
				
				    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
                    $("#ClaimDetail" + Rowid + "VcReasons").val('');
                    $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('');
                    $("#showreason_id_" + Rowid).hide();
				}
				
				} // end of main if 
				else{
				//alert(element);
				//alert($('#ClaimDetail'+Rowid+'DtInvoiceDate').val());
				//alert($(this).attr('type'));
				
				//var functionreturnvValue = window.getUniqueNo_New($('#ClaimDetail'+Rowid+'DtInvoiceDate').val(),'date');
				
				//console.log('return functionvalue=='+functionreturnvValue);
				/*
					if (noOfdays > 90 && ltrValue > 200) {

                    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
					$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months.');
					$("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice is ....');
                    $("#showreason_id_" + Rowid).show();

					} else if (noOfdays > 90 && ltrValue == 0) {
					
					$("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');

					$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months.');
					$("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice is....');
                    $("#showreason_id_" + Rowid).show();

					}
					else if (noOfdays > 90 && ltrValue < 200 && ltrValue != 0) {

                    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
    				
					$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months & Fuel is less than 200 Ltrs.');
                    $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice is....');
                    $("#showreason_id_" + Rowid).show();


					}
					else if (ltrValue < 200 && noOfdays < 90 && ltrValue != '') {

                    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
                    $("#ClaimDetail" + Rowid + "VcReasons").val('Fuel is less than 200 Ltrs.');
                    //$("#ClaimDetail" + Rowid + "VcReasons").val('Fuel is less than 200 Ltrs.');
                    $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Fuel is ....');
                    $("#showreason_id_" + Rowid).show();

					}else{
				
				    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
                    $("#ClaimDetail" + Rowid + "VcReasons").val('');
                    $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('');
                    $("#showreason_id_" + Rowid).hide();
					}
				
				*/
				}
				
				
				////// start of conditions/// 
				
				
               
					

				} // end of success
				});
				/////////end of conditions ////////
			


            },
            onClose: function() {
                $(this).trigger('blur');

            }
        });

    }



    /**
     * On click get reason
     */
    $('.innerbody').delegate("img[id *='showreason']", "click", function() {

        var Rowid = parseInt($(this).attr('id').split("showreason_id_")[1], 14);

        if ($.trim($('#ClaimDetail' + Rowid + 'VcReasons').val()) != '' && $.trim($('#ClaimDetail' + Rowid + 'VcReasons').val()) != null) {

            $(commonPopupObj).find('#messageshow').html($('#ClaimDetail' + Rowid + 'VcReasons').val());
            $(commonPopupObj).css('display', 'block');
        }

        else {
            //$(commonPopupObj).find('#messageshow').html('Invoice is Ok');
            //$(commonPopupObj).css('display','block');		
        }


    });


    /**
     * On change get calculate data
     */

    $(obj).delegate("input[name*='nu_litres']", 'change', function() {

        element = $(this);

        value = $(this).val();
        var Rowid = parseInt($(this).attr('id').split("ClaimDetail")[1], 10);

		var	invoicealreadycheck_L = true;
        
		if (Number(value) >= 0) {

            var ltrValue = parseFloat(0);

           	
			if ($.trim(value) != null && !isNaN($.trim(value)) && $.trim(value).length > 0)
            ltrValue = parseFloat($.trim(value));
			else
			ltrValue = parseFloat(0);	

            //ltrValue = parseFloat('012000');
            var todaydate = '';
            var noOfdays = 0;
            var InvoiceDate = $('#ClaimDetail' + Rowid + 'DtInvoiceDate').datepicker('getDate');

            if ($('#ClaimDetail' + Rowid + 'DtInvoiceDate').val() != '') {

                todaydate = new Date();
                noOfdays = Math.floor((todaydate.getTime() - InvoiceDate.getTime()) / 86400000);

            }
			if ($('#ClaimDetail' + Rowid + 'DtInvoiceDate').val() != '' &&  $('#ClaimDetail'+Rowid+'VcInvoiceNo').val()!='' 
			&& $('#ClaimDetail'+Rowid+'VcOutletCode').val()!='') {
			
			/**********Start For the invoice unique check*************/
				$.ajax({
				type: "POST",
			    url: GLOBLA_PATH + "flr/claims/getAllInvoiceCheck/",
				data: {
				
				ClaimHeaderVcInvoicedate :function(){
				return $('#ClaimDetail'+Rowid+'DtInvoiceDate').val()
				},
				ClaimDetailVcInvoiceNo :function(){
				return $('#ClaimDetail'+Rowid+'VcInvoiceNo').val()
				},
				ClaimHeaderVcOutletCode :function(){						
				return $('#ClaimDetail'+Rowid+'VcOutletCode').val()
				}
				
				},			
				success : function (data) {
				if(data==false){				
					//console.log(data+'==data');					
					invoicealreadycheck_L = false;
				}				

            	if(invoicealreadycheck_L==false && ltrValue >= 200 && noOfdays <= 90){
				
				$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice already exsist.');
			    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
			    $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice alr ....');
                $("#showreason_id_" + Rowid).show();
	
			}else if (ltrValue < 200 && noOfdays > 90) {
			
                $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
				
				if(invoicealreadycheck_L == false){
				
				$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months & Fuel is less than 200 Ltrs & Invoice already exsist.');
                
				} else {
				
				$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months & Fuel is less than 200 Ltrs.');
                
				}
				
                $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice is ....');
                $("#showreason_id_" + Rowid).show();


            } else if (ltrValue > 200 && noOfdays > 90) {
                $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
                
				if(invoicealreadycheck_L==false){
				
				$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months & Invoice already exsist.');
                
				} else {
				
				$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months.');
                
				}
				$("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice is ...');
                $("#showreason_id_" + Rowid).show();

            } else if (ltrValue < 200 && noOfdays <= 90) {
					
                $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
                
				if(invoicealreadycheck_L==false){
				
				$("#ClaimDetail" + Rowid + "VcReasons").val('Fuel is less than 200 Ltrs. & Invoice already exsist.');
                
				} else {
				
				$("#ClaimDetail" + Rowid + "VcReasons").val('Fuel is less than 200 Ltrs.');
                
				}
				
                $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Fuel is ...');
                $("#showreason_id_" + Rowid).show();

            } else {
				
				console.log('20090==='+checkInvoicedatefuelLitres(Rowid));
	            if(checkInvoicedatefuelLitres(Rowid)==true && Rowid>0){
                $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
                $("#ClaimDetail" + Rowid + "VcReasons").val('');
                $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('');
                $("#showreason_id_" + Rowid).hide();
				}
            }


            var nu_refund_prcn = $(element).parent().parent().find("input[name *='[nu_refund_prcn]']").val();

            var nu_admin_fee_prcnt = $(element).parent().parent().find("input[name *='[nu_admin_fee_prcnt]']").val();

            var nu_refund_rate = $(element).parent().parent().find("input[name *='[nu_refund_rate]']").val();

            if (ltrValue < 200 || noOfdays > 90 || invoicealreadycheck_L == false) {

                var admin_fee = parseFloat(0);
                var amount = parseFloat(0);

                $(element).parent().parent().find("input[name *='[nu_admin_fee]']").val(admin_fee).trigger('blur');

                $(element).parent().parent().find("input[name *='[nu_amount]']").val(amount).trigger('blur');

            } else {

                //alert(ltrValue);
                var admin_fee = parseFloat(nu_admin_fee_prcnt * ltrValue).toFixed(2);
                var amount = parseFloat(nu_refund_rate * ltrValue).toFixed(2);
                $(element).parent().parent().find("input[name *='[nu_admin_fee]']").val(admin_fee).trigger('blur');

                $(element).parent().parent().find("input[name *='[nu_amount]']").val(amount).trigger('blur');



            }
					//		console.log(nu_admin_fee_prcnt+'==nu_admin_fee_prcnt==ltrValue=='+ltrValue);



            var totalMt = parseFloat(0);
			//console.log(            $(this).parent().parent().parent().find("input[name *='[nu_amount']"));

            $(this).parent().parent().parent().find("input[name *='[nu_amount']").each(function() {
				//console.log('amt=='+$(this).val());

                if (Number($.trim($(this).val())) >= 0 && $.trim($(this).val()) != '' && $.trim($(this).val()) != null) {

                    var val = parseFloat($.trim($(this).val()));
                    totalMt = parseFloat(totalMt) + parseFloat(val);
					console.log(totalMt);

                } else {

                    var val = parseFloat(0);

                }


            });
            totalMt = parseFloat(totalMt).toFixed(2);
            $('#showtotalamount_id').html(totalMt);
            //parseFloat($('#showtotalamount_id').html(totalMt)).toFixed(2);
            //$(this).parent().parent().parent().parent().find('tfoot tr').find('td:eq(9)').find('.showamt').html( parseFloat(totalMt));	

        } 
		});
     
	 }// if ajax strat
	
	 
	
	}else{
			
			$(element).parent().parent().find("input[name *='[nu_admin_fee]']").val('');

            $(element).parent().parent().find("input[name *='[nu_amount]']").val('');

            var totalMt = Math.floor(0);

            $(this).parent().parent().parent().find("input[name *='[nu_amount]']").each(function() {


                
                var val = parseFloat($.trim($(this).val()));
				totalMt = parseFloat(totalMt) + parseFloat(val);
                
            });
            //totalamtdisplay(totalMt);
            $('#showtotalamount_id').html(totalMt);
		
	
		} // if first
	
	});



    /**
     *
     *	Form Validation Function
     *
     */
    function validate() {

        var addobject = $(obj).find('.innerbody:eq(1)').find('table tbody');

        $.validator.addMethod("onlyNumberWithoutFloat", function(value, element) {

            if (Number(value) >= 0) {

                return true;

            }

            return false;

        }, "Decimal not accepted");

		
		if($('#ClaimHeaderSinglefileuploadID').is(':checked')==true){
		var buttonObject='#ClaimMultipleDOCID';	
		//alert(obj.find('.uploadify-queue-item').length+'--len');
		if(obj.find('.uploadify-queue-item').length==0 ){ 
				
			if($(buttonObject).hasClass('form-error')==false){
				
				$(buttonObject).addClass('form-error');					
				$(buttonObject).after('<div class="add-error">Required</div>');
			
			}
		
		}else{
			$(buttonObject).removeClass('form-error');					
			$(buttonObject).next('.add-error').remove();
			$(buttonObject).closest('div').remove(".add-error");

		}
		}
		
        $(addobject).find("select[name*='vc_outlet_code']").each(function() {

            $(this).rules("add", {
                required: true,
                //getUniqueNo: true,				
                messages: {
                    required: 'Required'
                }});
		});
		/*
		$('input, select').change(function(){
			$('input, select').trigger('blur');
		});
		*/
		window.getUniqueNo_New = function(value,element){
		
		         //  alert(value);
		           //alert(element);
				   
		if ($.trim(value) != '') {
				
				outletObj = $(element).parent().parent().parent().find("select[name*='vc_outlet_code']");					
				dateObj   = $(element).parent().parent().parent().find("input[name*='dt_invoice_date']");                
				Obj       = $(element).parent().parent().parent().find("input[name*='vc_invoice_no']");
				ObjLitres       = $(element).parent().parent().parent().find("input[name*='nu_litres']");
				
                currIndex = parseInt($(Obj).index(element));
                datecurrIndex = parseInt($(dateObj).index(element));
                outletcurrIndex = parseInt($(outletObj).index(element));
				//start for litres//
				
					//var litrescurrIndex=Rowid;
				ObjLitres       = $(element).parent().parent().parent().find("input[name*='nu_litres']");				
                
				litrescurrIndex = parseInt($(ObjLitres).index(element));

				if(litrescurrIndex >= 0){
				 
				var curentdatevalue         = $('#ClaimDetail'+litrescurrIndex+'DtInvoiceDate').val();
				var curentVcInvoiceNovalue  = $('#ClaimDetail'+litrescurrIndex+'VcInvoiceNo').val();
			    var curentVcOutletCodevalue = $('#ClaimDetail'+litrescurrIndex+'VcOutletCode').val();
				var todaydate = new Date();				
				
				if($('#ClaimDetail'+litrescurrIndex+'DtInvoiceDate').val()!=''){
				
                var curentdatevalueConvert = $('#ClaimDetail'+litrescurrIndex+'DtInvoiceDate').datepicker('getDate');
				noOfdays = Math.floor((todaydate.getTime() - curentdatevalueConvert.getTime()) / 86400000); // ms per day
				
				}
				
				if ($.trim($("#ClaimDetail" + litrescurrIndex + "NuLitres").val()) != null && !isNaN($.trim($("#ClaimDetail" + litrescurrIndex + "NuLitres").val())) && $.trim($("#ClaimDetail" + litrescurrIndex + "NuLitres").val()).length > 0)
				var curentNuLitresvalue = parseFloat($('#ClaimDetail'+litrescurrIndex+'NuLitres').val());
				else
				var curentNuLitresvalue = parseFloat(0);
				
				}
				//alert(litrescurrIndex);
				$(ObjLitres).each(function() {

		        runObjIndex = parseInt($(ObjLitres).index(this));
				notcurentVcInvoiceNovalue = $('#ClaimDetail'+runObjIndex+'VcInvoiceNo').val();
				notcurentdatevalue = $('#ClaimDetail'+runObjIndex+'DtInvoiceDate').val();
				notcurentVcOutletCodevalue = $('#ClaimDetail'+runObjIndex+'VcOutletCode').val();    
				
				
				if (litrescurrIndex != runObjIndex) {
					//	alert('thival--'+$(this).val());	
                  if (($.trim(notcurentVcOutletCodevalue) == $.trim(curentVcOutletCodevalue))
					&& ($.trim(notcurentdatevalue)==$.trim(curentdatevalue))
					&& ($.trim(notcurentVcInvoiceNovalue)==$.trim(curentVcInvoiceNovalue)) && 
					$.trim(curentVcInvoiceNovalue)!='' && 
					$.trim(curentVcOutletCodevalue)!='' &&
					$.trim(curentdatevalue)!=''
					) {
					
                    $("#ch_rejected_td_"+litrescurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
                    
					if(curentNuLitresvalue < 200 && noOfdays<90){
					
						$("#ClaimDetail" + litrescurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200');

					}else if(curentNuLitresvalue > 200 && noOfdays>90){
					
						$("#ClaimDetail" + litrescurrIndex + "VcReasons").val('Invoice already exsist. and Invoice older than 3 months.');
					
					}else if(curentNuLitresvalue < 200 && noOfdays>90){
					
						$("#ClaimDetail" + litrescurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200 and Invoice older than 3 months.');
					
					}
					
					else {
					console.log(curentNuLitresvalue+'==curentNuLitresvalue=='+curentVcOutletCodevalue+'==curentVcOutletCodevalue==curentdatevalue'+curentdatevalue+'==curentVcInvoiceNovalue--'+curentVcInvoiceNovalue);

						$("#ClaimDetail" + litrescurrIndex + "VcReasons").val('Invoice already exsist.');
					}
                    
					$("#ClaimDetail" + litrescurrIndex + "VcReasonsDiv").html('Invoice alr ....');
                    $("#showreason_id_" + litrescurrIndex).show();
						console.log('kisme1');
					
                     return false;

                    }else{
						console.log('kisme');
						$("#ch_rejected_td_" + litrescurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
						$("#ClaimDetail" + litrescurrIndex + "VcReasons").val('');
						$("#ClaimDetail" + litrescurrIndex + "VcReasonsDiv").html('');
						$("#showreason_id_" + litrescurrIndex).hide();
                       return true;						
					}

                    }	
				
				});
				
				//end for litres//
				
				
				if(outletcurrIndex>=0){
				 
				curentdatevalue = $('#ClaimDetail'+outletcurrIndex+'DtInvoiceDate').val();
				curentVcInvoiceNovalue = $('#ClaimDetail'+outletcurrIndex+'VcInvoiceNo').val();
			    curentVcOutletCodevalue = $('#ClaimDetail'+outletcurrIndex+'VcOutletCode').val();
				
				var todaydate = new Date();				
				
				if($('#ClaimDetail'+outletcurrIndex+'DtInvoiceDate').val()!=''){
				
                var curentdatevalueConvert = $('#ClaimDetail'+outletcurrIndex+'DtInvoiceDate').datepicker('getDate');
				noOfdays = Math.floor((todaydate.getTime() - curentdatevalueConvert.getTime()) / 86400000); // ms per day
				
				}
				
				if ($.trim($("#ClaimDetail" + outletcurrIndex + "NuLitres").val()) != null && !isNaN($.trim($("#ClaimDetail" + outletcurrIndex + "NuLitres").val())) && $.trim($("#ClaimDetail" + outletcurrIndex + "NuLitres").val()).length > 0)
				var curentNuLitresvalue = parseFloat($('#ClaimDetail'+outletcurrIndex+'NuLitres').val());
				else
				var curentNuLitresvalue = parseFloat(0);
				
				}
				
				$(outletObj).each(function() {

		        runObjIndex = parseInt($(outletObj).index(this));
				notcurentVcInvoiceNovalue = $('#ClaimDetail'+runObjIndex+'VcInvoiceNo').val();
				notcurentdatevalue = $('#ClaimDetail'+runObjIndex+'DtInvoiceDate').val();
				notcurentVcOutletCodevalue = $('#ClaimDetail'+runObjIndex+'VcOutletCode').val();    
				
				
				if (outletcurrIndex != runObjIndex) {
					//	alert('thival--'+$(this).val());	
                  if (($.trim(value) == $.trim($(this).val()))
					&& ($.trim(notcurentdatevalue)==$.trim(curentdatevalue))
					&& ($.trim(notcurentVcInvoiceNovalue)==$.trim(curentVcInvoiceNovalue)) && 
					$.trim(curentVcInvoiceNovalue)!='' && 
					$.trim(value)!='' &&
					$.trim(curentdatevalue)!=''
					) {

                            $("#ch_rejected_td_" + outletcurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
                    
					if(curentNuLitresvalue < 200 && noOfdays<90){
					
						$("#ClaimDetail" + outletcurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200');

					}else if(curentNuLitresvalue > 200 && noOfdays>90){
					
						$("#ClaimDetail" + outletcurrIndex + "VcReasons").val('Invoice already exsist. and Invoice older than 3 months.');
					
					}else if(curentNuLitresvalue < 200 && noOfdays>90){
					
						$("#ClaimDetail" + outletcurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200 and Invoice older than 3 months.');
					
					}
					
					else {
					
						$("#ClaimDetail" + outletcurrIndex + "VcReasons").val('Invoice already exsist.');
					}
                    
					$("#ClaimDetail" + outletcurrIndex + "VcReasonsDiv").html('Invoice alr ....');
                    $("#showreason_id_" + outletcurrIndex).show();
					
                     return false;

                    }else{
						
						$("#ch_rejected_td_" + outletcurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
						$("#ClaimDetail" + outletcurrIndex + "VcReasons").val('');
						$("#ClaimDetail" + outletcurrIndex + "VcReasonsDiv").html('');
						$("#showreason_id_" + outletcurrIndex).hide();						
					}

                    }
		
				
				});
				
				if(datecurrIndex >=0 ){
				
				 curentdatevalue = $('#ClaimDetail'+datecurrIndex+'DtInvoiceDate').val();
				 curentVcInvoiceNovalue = $('#ClaimDetail'+datecurrIndex+'VcInvoiceNo').val();
				 curentVcOutletCodevalue = $('#ClaimDetail'+datecurrIndex+'VcOutletCode').val();
				 
				 if ($.trim($("#ClaimDetail" + datecurrIndex + "NuLitres").val()) != null && !isNaN($.trim($("#ClaimDetail" + datecurrIndex + "NuLitres").val())) && $.trim($("#ClaimDetail" + datecurrIndex + "NuLitres").val()).length > 0)
					var curentNuLitresvalue = parseFloat($('#ClaimDetail'+datecurrIndex+'NuLitres').val());
				 else
					var curentNuLitresvalue = parseFloat(0);
					
				var todaydate = new Date();				
				if($('#ClaimDetail'+datecurrIndex+'DtInvoiceDate').val()!='')
                curentdatevalueConvert = $('#ClaimDetail'+datecurrIndex+'DtInvoiceDate').datepicker('getDate');
				noOfdays = Math.floor((todaydate.getTime() - curentdatevalueConvert.getTime()) / 86400000); // ms per day
				
				}
				
				
				$(dateObj).each(function() {	
				
				
                runObjIndex = parseInt($(dateObj).index(this));
				notcurentVcInvoiceNovalue = $('#ClaimDetail'+runObjIndex+'VcInvoiceNo').val();
				notcurentVcOutletCodevalue = $('#ClaimDetail'+runObjIndex+'VcOutletCode').val();    
				
				
				
				if (datecurrIndex != runObjIndex) {
					
                        if (($.trim(value)== $.trim($(this).val()))
						&& ($.trim(notcurentVcInvoiceNovalue)==$.trim(curentVcInvoiceNovalue)) && 
						($.trim(notcurentVcOutletCodevalue)==$.trim(curentVcOutletCodevalue)) 
						&&
						$.trim(curentVcInvoiceNovalue)!='' && 
						$.trim(curentVcOutletCodevalue)!='' &&
						$.trim(value)!=''	) {

                            $("#ch_rejected_td_" + datecurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
						
						if(curentNuLitresvalue < 200 && noOfdays<90){
					
						$("#ClaimDetail" + datecurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200');

						}else if(curentNuLitresvalue > 200 && noOfdays>90){
					
						$("#ClaimDetail" + datecurrIndex + "VcReasons").val('Invoice already exsist. and Invoice older than 3 months.');
					
						}else if(curentNuLitresvalue < 200 && noOfdays>90){
					
						$("#ClaimDetail" + datecurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200 and Invoice older than 3 months.');
					
						}else {
						
						$("#ClaimDetail" + datecurrIndex + "VcReasons").val('Invoice already exsist.');
						
						}
						$("#ClaimDetail" + datecurrIndex + "VcReasonsDiv").html('Invoice alr ....');
						$("#showreason_id_" + datecurrIndex).show();
						checkcorrectstatus=false;


                        return false;

                        }else{
						
						$("#ch_rejected_td_" + datecurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
						$("#ClaimDetail" + datecurrIndex + "VcReasons").val('');
						$("#ClaimDetail" + datecurrIndex + "VcReasonsDiv").html('');
						$("#showreason_id_" + datecurrIndex).hide();
						
						
						}

                    }

                });
				
				if(currIndex>=0){
				 
				curentdatevalue = $('#ClaimDetail'+currIndex+'DtInvoiceDate').val();
				curentVcInvoiceNovalue = $('#ClaimDetail'+currIndex+'VcInvoiceNo').val();
			    curentVcOutletCodevalue = $('#ClaimDetail'+currIndex+'VcOutletCode').val();
				
				if($('#ClaimDetail'+currIndex+'NuLitres').val()!='')
					var curentNuLitresvalue = parseFloat($('#ClaimDetail'+currIndex+'NuLitres').val());
				 else
					var curentNuLitresvalue = parseFloat(0);
					
				var todaydate = new Date();	
				
				if($('#ClaimDetail'+currIndex+'DtInvoiceDate').val()!=''){				
				
				var  curentdatevalueConvert = $('#ClaimDetail'+currIndex+'DtInvoiceDate').datepicker('getDate');
				noOfdays = Math.floor((todaydate.getTime() - curentdatevalueConvert.getTime()) / 86400000); // ms per day
				
				}
				
				}
				
				$(Obj).each(function() {	
				
				//alert(Obj.attr('id'));
                runObjIndex = parseInt($(Obj).index(this));
				notcurentdatevalue = $('#ClaimDetail'+runObjIndex+'DtInvoiceDate').val();
				notcurentVcOutletCodevalue = $('#ClaimDetail'+runObjIndex+'VcOutletCode').val();    
				if (currIndex != runObjIndex) {
							
                        if (($.trim(value).toLowerCase() == $.trim($(this).val().toLowerCase()))
						&& 
						($.trim(notcurentdatevalue)==$.trim(curentdatevalue))
						&&
						($.trim(notcurentVcOutletCodevalue)==$.trim(curentVcOutletCodevalue))
						&&
						$.trim(notcurentdatevalue)!='' && 
						$.trim(curentdatevalue)!='' && 
						$.trim(notcurentVcOutletCodevalue)!='' &&
						$.trim(curentVcOutletCodevalue)!='' &&
						 $.trim(value)!=''
						) {

                    
					if(curentNuLitresvalue < 200 && noOfdays<90){
					
						$("#ClaimDetail" + currIndex + "VcReasons").val('Invoice already exsist. and Fuel is less than 200 Ltrs.');

						}else if(curentNuLitresvalue > 200 && noOfdays>90){
					
						$("#ClaimDetail" + currIndex + "VcReasons").val('Invoice already exsist. and Invoice older than 3 months.');
					
						}else if(curentNuLitresvalue < 200 && noOfdays>90){
					
						$("#ClaimDetail" + currIndex + "VcReasons").val('Invoice already exsist. and Fuel is less than 200 Ltrs and Invoice older than 3 months.');
					
						}else {
						
						$("#ClaimDetail" + currIndex + "VcReasons").val('Invoice already exsist.');
						
						}		
						
					    $("#ch_rejected_td_" + currIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');

						$("#ClaimDetail" + currIndex + "VcReasonsDiv").html('Invoice alr ....');
						$("#showreason_id_" + currIndex).show();
						checkcorrectstatus=false;

                        return false;

                        }else{
					
						$("#ch_rejected_td_" + currIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
						$("#ClaimDetail" + currIndex + "VcReasons").val('');
						$("#ClaimDetail" + currIndex + "VcReasonsDiv").html('');
						$("#showreason_id_" + currIndex).hide();					
						 } 
						}
                });

            }
		
		}
       
	   /*$.validator.addMethod('getUniqueNo', function(value, element) {

            returnPass = true;
                //    alert(value);
					//  alert('ele=='+element);

            if ($.trim(value) != '') {
				outletObj = $(element).parent().parent().parent().find("select[name*='vc_outlet_code']");	
				
				dateObj   = $(element).parent().parent().parent().find("input[name*='dt_invoice_date']");	
                
				Obj       = $(element).parent().parent().parent().find("input[name*='vc_invoice_no']");
				ObjLitres       = $(element).parent().parent().parent().find("input[name*='nu_litres']");
				//console.log(dateObj.toSource()+'==dateobj');
                currIndex = parseInt($(Obj).index(element));
                datecurrIndex = parseInt($(dateObj).iandex(element));
                outletcurrIndex = parseInt($(outletObj).index(element));
                
				
				
				
				if(outletcurrIndex>=0){
				 
				curentdatevalue = $('#ClaimDetail'+outletcurrIndex+'DtInvoiceDate').val();
				curentVcInvoiceNovalue = $('#ClaimDetail'+outletcurrIndex+'VcInvoiceNo').val();
			    curentVcOutletCodevalue = $('#ClaimDetail'+outletcurrIndex+'VcOutletCode').val();
				
				var todaydate = new Date();				
				
				if($('#ClaimDetail'+outletcurrIndex+'DtInvoiceDate').val()!=''){
				
                var curentdatevalueConvert = $('#ClaimDetail'+outletcurrIndex+'DtInvoiceDate').datepicker('getDate');
				noOfdays = Math.floor((todaydate.getTime() - curentdatevalueConvert.getTime()) / 86400000); // ms per day
				
				}
				
				if ($.trim($("#ClaimDetail" + outletcurrIndex + "NuLitres").val()) != null && !isNaN($.trim($("#ClaimDetail" + outletcurrIndex + "NuLitres").val())) && $.trim($("#ClaimDetail" + outletcurrIndex + "NuLitres").val()).length > 0)
				var curentNuLitresvalue = parseFloat($('#ClaimDetail'+outletcurrIndex+'NuLitres').val());
				else
				var curentNuLitresvalue = parseFloat(0);
				
				}
				
				$(outletObj).each(function() {

		        runObjIndex = parseInt($(outletObj).index(this));
				notcurentVcInvoiceNovalue = $('#ClaimDetail'+runObjIndex+'VcInvoiceNo').val();
				notcurentdatevalue = $('#ClaimDetail'+runObjIndex+'DtInvoiceDate').val();
				notcurentVcOutletCodevalue = $('#ClaimDetail'+runObjIndex+'VcOutletCode').val();    
				
				
				if (outletcurrIndex != runObjIndex) {
					//	alert('thival--'+$(this).val());	
                  if (($.trim(value) == $.trim($(this).val()))
					&& ($.trim(notcurentdatevalue)==$.trim(curentdatevalue))
					&& ($.trim(notcurentVcInvoiceNovalue)==$.trim(curentVcInvoiceNovalue)) && 
					$.trim(curentVcInvoiceNovalue)!='' && 
					$.trim(value)!='' &&
					$.trim(curentdatevalue)!=''
					) {

                            $("#ch_rejected_td_" + outletcurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
                    
					if(curentNuLitresvalue < 200 && noOfdays<90){
					
						$("#ClaimDetail" + outletcurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200');

					}else if(curentNuLitresvalue > 200 && noOfdays>90){
					
						$("#ClaimDetail" + outletcurrIndex + "VcReasons").val('Invoice already exsist. and Invoice older than 3 months.');
					
					}else if(curentNuLitresvalue < 200 && noOfdays>90){
					
						$("#ClaimDetail" + outletcurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200 and Invoice older than 3 months.');
					
					}
					
					else {
					
						$("#ClaimDetail" + outletcurrIndex + "VcReasons").val('Invoice already exsist.');
					}
                    
					$("#ClaimDetail" + outletcurrIndex + "VcReasonsDiv").html('Invoice alr ....');
                    $("#showreason_id_" + outletcurrIndex).show();
					
                     return false;

                    }else{
						
						$("#ch_rejected_td_" + outletcurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
						$("#ClaimDetail" + outletcurrIndex + "VcReasons").val('');
						$("#ClaimDetail" + outletcurrIndex + "VcReasonsDiv").html('');
						$("#showreason_id_" + outletcurrIndex).hide();						
					}

                    }
		
				
				});
				
				if(datecurrIndex >=0 ){
				
				 curentdatevalue = $('#ClaimDetail'+datecurrIndex+'DtInvoiceDate').val();
				 curentVcInvoiceNovalue = $('#ClaimDetail'+datecurrIndex+'VcInvoiceNo').val();
				 curentVcOutletCodevalue = $('#ClaimDetail'+datecurrIndex+'VcOutletCode').val();
				 
				if ($.trim($("#ClaimDetail" + datecurrIndex + "NuLitres").val()) != null && !isNaN($.trim($("#ClaimDetail" + datecurrIndex + "NuLitres").val())) && $.trim($("#ClaimDetail" + datecurrIndex + "NuLitres").val()).length > 0)
					var curentNuLitresvalue = parseFloat($('#ClaimDetail'+datecurrIndex+'NuLitres').val());
				 else
					var curentNuLitresvalue = parseFloat(0);
					
				var todaydate = new Date();				
				if($('#ClaimDetail'+datecurrIndex+'DtInvoiceDate').val()!='')
                curentdatevalueConvert = $('#ClaimDetail'+datecurrIndex+'DtInvoiceDate').datepicker('getDate');
				noOfdays = Math.floor((todaydate.getTime() - curentdatevalueConvert.getTime()) / 86400000); // ms per day
				
				}
				
				
				$(dateObj).each(function() {	
				
				
                runObjIndex = parseInt($(dateObj).index(this));
				notcurentVcInvoiceNovalue = $('#ClaimDetail'+runObjIndex+'VcInvoiceNo').val();
				notcurentVcOutletCodevalue = $('#ClaimDetail'+runObjIndex+'VcOutletCode').val();    
				
				
				
				if (datecurrIndex != runObjIndex) {
					
                        if (($.trim(value)== $.trim($(this).val()))
						&& ($.trim(notcurentVcInvoiceNovalue)==$.trim(curentVcInvoiceNovalue)) && 
						($.trim(notcurentVcOutletCodevalue)==$.trim(curentVcOutletCodevalue)) 
						&&
						$.trim(curentVcInvoiceNovalue)!='' && 
						$.trim(curentVcOutletCodevalue)!='' &&
						$.trim(value)!=''	) {
						console.log('aagay bhai');	
						$("#ch_rejected_td_" + datecurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
						
						if(curentNuLitresvalue < 200 && curentNuLitresvalue!=0 && noOfdays<90){
					
						$("#ClaimDetail" + datecurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200');

						}else if(curentNuLitresvalue > 200 && noOfdays>90){
					
						$("#ClaimDetail" + datecurrIndex + "VcReasons").val('Invoice already exsist. and Invoice older than 3 months.');
					
						}else if(curentNuLitresvalue < 200 && curentNuLitresvalue!=0  && noOfdays>90){
					
						$("#ClaimDetail" + datecurrIndex + "VcReasons").val('Invoice already exsist. and Fuel litres  less than 200 and Invoice older than 3 months.');
					
						}else {
						
						$("#ClaimDetail" + datecurrIndex + "VcReasons").val('Invoice already exsist.');
						
						}
						$("#ClaimDetail" + datecurrIndex + "VcReasonsDiv").html('Invoice alr ....');
						$("#showreason_id_" + datecurrIndex).show();
						checkcorrectstatus=false;


                        return false;

                        }else{
						
						$("#ch_rejected_td_" + datecurrIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
						$("#ClaimDetail" + datecurrIndex + "VcReasons").val('');
						$("#ClaimDetail" + datecurrIndex + "VcReasonsDiv").html('');
						$("#showreason_id_" + datecurrIndex).hide();
						
						
						}

                    }

                });
				
				if(currIndex>=0){
				 
				curentdatevalue = $('#ClaimDetail'+currIndex+'DtInvoiceDate').val();
				curentVcInvoiceNovalue = $('#ClaimDetail'+currIndex+'VcInvoiceNo').val();
			    curentVcOutletCodevalue = $('#ClaimDetail'+currIndex+'VcOutletCode').val();
				
				if($('#ClaimDetail'+currIndex+'NuLitres').val()!='')
					var curentNuLitresvalue = parseFloat($('#ClaimDetail'+currIndex+'NuLitres').val());
				 else
					var curentNuLitresvalue = parseFloat(0);
					
				var todaydate = new Date();	
				
				if($('#ClaimDetail'+currIndex+'DtInvoiceDate').val()!=''){				
				
				var  curentdatevalueConvert = $('#ClaimDetail'+currIndex+'DtInvoiceDate').datepicker('getDate');
				noOfdays = Math.floor((todaydate.getTime() - curentdatevalueConvert.getTime()) / 86400000); // ms per day
				
				}
				
				}
				
				$(Obj).each(function() {	
				
				//alert(Obj.attr('id'));
                runObjIndex = parseInt($(Obj).index(this));
				notcurentdatevalue = $('#ClaimDetail'+runObjIndex+'DtInvoiceDate').val();
				notcurentVcOutletCodevalue = $('#ClaimDetail'+runObjIndex+'VcOutletCode').val();    
				if (currIndex != runObjIndex) {
							
                        if (($.trim(value).toLowerCase() == $.trim($(this).val().toLowerCase()))
						&& 
						($.trim(notcurentdatevalue)==$.trim(curentdatevalue))
						&&
						($.trim(notcurentVcOutletCodevalue)==$.trim(curentVcOutletCodevalue))
						&&
						$.trim(notcurentdatevalue)!='' && 
						$.trim(curentdatevalue)!='' && 
						$.trim(notcurentVcOutletCodevalue)!='' &&
						$.trim(curentVcOutletCodevalue)!='' &&
						 $.trim(value)!=''
						) {

                     //returnPass = false;
					//$('#ClaimDetail'+currIndex+'VcInvoiceNo').val('');
					//$(commonPopupObj).find('#messageshow').html('Invoice already exsist.');
					//$(commonPopupObj).css('display', 'block');
					if(curentNuLitresvalue < 200 && noOfdays<90){
					
						$("#ClaimDetail" + currIndex + "VcReasons").val('Invoice already exsist. and Fuel is less than 200 Ltrs.');

						}else if(curentNuLitresvalue > 200 && noOfdays>90){
					
						$("#ClaimDetail" + currIndex + "VcReasons").val('Invoice already exsist. and Invoice older than 3 months.');
					
						}else if(curentNuLitresvalue < 200 && noOfdays>90){
					
						$("#ClaimDetail" + currIndex + "VcReasons").val('Invoice already exsist. and Fuel is less than 200 Ltrs and Invoice older than 3 months.');
					
						}else {
						
						$("#ClaimDetail" + currIndex + "VcReasons").val('Invoice already exsist.');
						
						}		
						
					    $("#ch_rejected_td_" + currIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');

						$("#ClaimDetail" + currIndex + "VcReasonsDiv").html('Invoice alr ....');
						$("#showreason_id_" + currIndex).show();
						checkcorrectstatus=false;

                        return false;

                        }else{
					
						$("#ch_rejected_td_" + currIndex).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
						$("#ClaimDetail" + currIndex + "VcReasons").val('');
						$("#ClaimDetail" + currIndex + "VcReasonsDiv").html('');
						$("#showreason_id_" + currIndex).hide();

						
						}

                    }

                });

            }

            return returnPass;

        }, ' Already used ');
		*/
		
		
		
			/*$(obj).delegate(".changevalidations",'change',function(){ 
		    //alert($(this).attr('id'));
		var invoicealreadycheck  = true;
			var Rowid = parseInt($(this).attr('id').split("ClaimDetail")[1], 12);
			$.ajax({
				type: "POST",
			    url: GLOBLA_PATH + "flr/claims/getAllInvoiceCheck/",
				data: {
				ClaimHeaderVcInvoicedate :function(){
							
				return $('#ClaimDetail'+Rowid+'DtInvoiceDate').val()
							
				},
				ClaimDetailVcInvoiceNo :function(){
							
				return $('#ClaimDetail'+Rowid+'VcInvoiceNo').val()
							
				},
				ClaimHeaderVcOutletCode :function(){
				
				return $('#ClaimDetail'+Rowid+'VcOutletCode').val()
				
				}
				},			
				success : function (data) {
				//alert(data);
				if(data==false){
				
				invoicealreadycheck = false;			
			
				}
				
				var VcInvoiceNo   =		$('#ClaimDetail'+Rowid+'VcInvoiceNo').val();
			    var VcOutletCode  =		$('#ClaimDetail'+Rowid+'VcOutletCode').val();
				
				if($('#ClaimDetail'+Rowid+'DtInvoiceDate').val()!='')
				var DtInvoiceDate =		$('#ClaimDetail'+Rowid+'DtInvoiceDate').datepicker('getDate').getTime();
				else
				var DtInvoiceDate =		'';
				
				if($('#ClaimDetail'+Rowid+'NuLitres').val()!='')				
				var literValue    =		$('#ClaimDetail'+Rowid+'NuLitres').val();
				else
				var literValue    =     parseFloat(0);
				
				alert(data);
				
				if(invoicealreadycheck==false){
				 
				 $returnvalue = callAfterajax(invoicealreadycheck,literValue,Rowid,DtInvoiceDate);	
					
				}else{
					//console.log(value+'==,=='+element+'==getUniqueNo_New');
				   window.getUniqueNo_New(value,element);
				}	
				}
				
			});console.log(value+'==,=='+element+'==getUniqueNo_New');
				console.log(invoicealreadycheck+'==,====invoicealreadycheck');
		alert('daata');
		});*/

		 
		
		 function callAfterajax(invoicealreadycheck,ltrValue,Rowid,InvoiceDate){
				
			var noOfdays = 0;
			// var InvoiceDate = noOfdays;
			var todaydate = new Date();
			//var InvoiceDate = $('#ClaimDetail' + Rowid + 'DtInvoiceDate').datepicker('getDate');
			if(InvoiceDate!='')
			noOfdays = Math.floor((todaydate.getTime() - InvoiceDate) / 86400000); // ms per day			 
			else
			noOfdays = Math.floor(0);
			
			
			if(ltrValue ==0 && noOfdays <= 90){
				
				$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice already exsist.');
			    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
			    $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice alr ....');
                $("#showreason_id_" + Rowid).show();
				return false;
	
			}else if(ltrValue >= 200 && noOfdays <= 90){
				console.log('callAfterajax1');
				$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice already exsist.');
			    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
			    $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice alr ....');
                $("#showreason_id_" + Rowid).show();
				return false;
	
			}else if (ltrValue < 200 && ltrValue!=0 && noOfdays > 90 ) {
			
				console.log('callAfterajax2');
                $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
				$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months & Fuel is less than 200 Ltrs & Invoice already exsist.');
            	$("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice is ....');
                $("#showreason_id_" + Rowid).show();
				return false;

            } else if (ltrValue > 200 && noOfdays > 90) {
				
				console.log('callAfterajax3');		
			
                $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
				$("#ClaimDetail" + Rowid + "VcReasons").val('Invoice is older than 3 months & Invoice already exsist.');
				$("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Invoice is ...');
                $("#showreason_id_" + Rowid).show();
				return false;

            } else if (ltrValue < 200  && ltrValue!=0 && noOfdays <= 90) {
			
				console.log('callAfterajax4');
				$("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/with-check.jpg">');
            	$("#ClaimDetail" + Rowid + "VcReasons").val('Fuel is less than 200 Ltrs. & Invoice already exsist.');
                $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('Fuel is ...');
                $("#showreason_id_" + Rowid).show();
				return false;

            } else {
			    
				console.log('callAfterajax5');
			    $("#ch_rejected_td_" + Rowid).html('<img alt="" src="'+GLOBLA_PATH+'/img/without-check.jpg">');
                $("#ClaimDetail" + Rowid + "VcReasons").val('');
                $("#ClaimDetail" + Rowid + "VcReasonsDiv").html('');
                $("#showreason_id_" + Rowid).hide();
				
            }
				
				var nu_refund_prcn = $("#ClaimDetail" + Rowid + "NuRefundPrcnt").val();
                var nu_admin_fee_prcnt = $("#ClaimDetail" + Rowid + "NuAdminFeePrcnt").val();
                var nu_refund_rate = $("#ClaimDetail" + Rowid + "NuRefundRate").val();



                if (ltrValue < 200 || noOfdays > 90 || invoicealreadycheck==false ) {

                    var admin_fee = 0;
                    var amount    = 0;

                    $("#ClaimDetail" + Rowid + "NuAdminFee").val(admin_fee).trigger('blur');

                    $("#ClaimDetail" + Rowid + "NuAmount").val(amount).trigger('blur');

                }
                else {

                    var admin_fee = parseFloat(nu_admin_fee_prcnt * ltrValue).toFixed(2);
                    var amount    = parseFloat(nu_refund_rate * ltrValue).toFixed(2);

                    $("#ClaimDetail" + Rowid + "NuAdminFee").val(admin_fee).trigger('blur');
                    $("#ClaimDetail" + Rowid + "NuAmount").val(amount).trigger('blur');

                }
				
				var totalMt = parseFloat(0);
                $(this).parent().parent().parent().find("input[name *='[nu_amount]']").each(function() {
				console.log('callAfterajax89995');
                    if (Number($.trim($(this).val())) >= 0 && $.trim($(this).val()) != '' && $.trim($(this).val()) != null) {

                        var val = parseFloat($.trim($(this).val()));
                        totalMt = parseFloat(totalMt) + parseFloat(val);
                        //alert('final-amt1222-'+totalMt);

                    } else {

                        var val = parseFloat(0);
                        //alert('final-amt11-'+totalMt);

                    }

                });

                totalMt = parseFloat(totalMt).toFixed(2);
                $('#showtotalamount_id').html(totalMt);
	 return true;
	 }
		
		/*
		$(addobject).delegate("select[name *='vc_outlet_code']",'change',function(){
		
		    var Rowid = parseInt($(this).attr('id').split("ClaimDetail")[1], 12);
			$.ajax({
				type: "POST",
			    url: GLOBLA_PATH + "flr/claims/getAllInvoiceCheck/",
				data: {
				ClaimHeaderVcInvoicedate :function(){
							
				return $('#ClaimDetail'+Rowid+'DtInvoiceDate').val()
							
				},
				ClaimDetailVcInvoiceNo :function(){
							
				return $('#ClaimDetail'+Rowid+'VcInvoiceNo').val()
							
				},
				ClaimHeaderVcOutletCode :function(){
						
				return $('#ClaimDetail'+Rowid+'VcOutletCode').val()
				}
				},			
				success : function (data) {
				//alert(data);
				if(data==false){
				$('#ClaimDetail'+Rowid+'VcInvoiceNo').val('');
				$(commonPopupObj).find('#messageshow').html('Invoice already exsist.');
				$(commonPopupObj).css('display', 'block');
				
				}
				
				}
				});
			
			//	alert('Rowid'+Rowid);
		});
		

        $(addobject).find("input[name *='vc_invoice_no']").each(function() {
			
			var Rowid = parseInt($(this).attr('id').split("ClaimDetail")[1], 11);
			
            $(this).rules("add", {
                required: true,
                alphanumeric: true,
                maxlength: 15,
                getUniqueNo: true,
                remote: {
                    url: GLOBLA_PATH + "flr/claims/getInvoiceCheck/",
                    type: "post",
					data: {
							ClaimHeaderVcInvoicedate :function(){
							
								return $('#ClaimDetail'+Rowid+'DtInvoiceDate').val()
							
							},
							ClaimHeaderVcOutletCode :function(){
						
								return $('#ClaimDetail'+Rowid+'VcOutletCode').val()
							}

						}
                },
                messages: {
                    required: 'Required',
                    alphanumeric: 'Alpha<br>numeric<br>only',
                    maxlength: 'Please<br>enter less than 15.',
                    remote: 'Already used'

                }});
        });
*/

        $(addobject).find("input[name*='dt_invoice_date']").each(function() {

            $(this).rules("add", {
                required: true,
                date: true,
                maxlength: 15,
				//getUniqueNo: true,               
                messages: {
                    required: 'Required'


                }});


        });

        
        $(addobject).find("input[name*='nu_litres']").each(function() {

            $(this).rules("add", {
                required: true,
                positiveNumber: true,
                maxlength: 10,
				//getUniqueNo: true,      
                //onlyNumberWithoutFloat	: true,
                messages: {
                    required: 'Required'


                }});

        });
		/* */

       
        $(addobject).find("input[type='file']").each(function() {

            $(this).rules("add", {
                required: {
					depends:function (){
					
					if($('#posted_data_id').val()=='SAVE'){
						return false;
					}else{
						return true;
					}					
				}},
				//required:true,	
                accept: true,
                filesize: true,
                messages: {
                    required: 'Please upload document'
                }

            });

        });

    }


    /*Set DatePicker At Run time and After new row add*/

    setDatePicker();

    /* Apply Validate rule before and after a new add */

    validate();

    /********Add Row**************/
    $(obj).find('#addrow').click(function() {

        var setMinNo = 1;

        //var rowCount = $(obj).find('.innerbody:eq(1)').find('table tbody tr').length;
        var rowCount = $(obj).find('#table_row_claims_id').find('tr').length;		
		$('#hidden_call').val(rowCount);
       // var addobject = $(obj).find('.innerbody:eq(1)').find('table tbody');
        var addobject = $(obj).find('table').find('#table_row_claims_id');

        if (rowCount >= setMinNo) {           

                $(addobject).find('tr:last').after("<tr id='loadingrow'> <td colspan='13'> <div id='loading' style='text-align:center;' ><img width='30px' src='" + GLOBLA_PATH + "img/loading.gif' > </img> </div></td> </tr>");

           
            $.ajax({
                type: "POST",
                url: GLOBLA_PATH + 'flr/claims/addclaim',
                data: {
                    rowCount: rowCount
                }

            }).done(function(data) {

                if (data !== '') {
                    var rowCountId = $(obj).find('#table_row_claims_id').find('tr').length;
					
					//alert(rowCountId);
                    /*Set DatePicker At Run time and After new row add*/
					
					if (rowCountId > 1) {

						$('#loadingrow').remove();
					
					}
                    //setDatePicker();

                    /* Apply Validate rule before and after a new add */
                   
                    $(addobject).find('tr:last').after(data);
					var row = $(obj).find('#table_row_claims_id').find('tr').length;
					
					if($('#ClaimHeaderSinglefileuploadID').is(':checked')){
						for(var k=1;k<=row;k++){
							$('#updoc'+k).css('display','none');
							$('#updoc'+k).find("div").remove(".error-message");

						}
					}else{
						for(var k=1;k<=row;k++){
							$('#updoc'+k).css('display','');
						}
					
					}
					
				
				
				//	$('#updoc2').css('display','none');
					
					validate();
					setDatePicker();
					
                    
					
                    

                }
            });

        }


    });

    /*************Delete Row *************/
    $(obj).find('#rmrow').click(function() {
        var setDefautShow = 1;

        //var rowCount = $(obj).find('.innerbody:eq(1)').find('table tbody tr').length;
        var rowCount = $(obj).find('#table_row_claims_id').find('tr').length;

        var addobject = $(obj).find('.innerbody:eq(1)').find('table tbody');




        if (rowCount > 1) {
            totalamtdisplay(rowCount);
            $(addobject).find('tr:last').remove();
        }
    });


    var dateDiff = function(d1, d2) {
        var diff = Math.abs(d1 - d2);
        if (Math.floor(diff / 86400000)) {
            return Math.floor(diff / 86400000) + " days";
        } else if (Math.floor(diff / 3600000)) {
            return Math.floor(diff / 3600000) + " hours";
        } else if (Math.floor(diff / 60000)) {
            return Math.floor(diff / 60000) + " minutes";
        } else {
            return "< 1 minute";
        }
    };



});
/*
$("#ClaimSinglefileuploadID").click(function(){
alert('hua');
		// If checked
		if ($("#ClaimSinglefileuploadID").is(":checked"))
		{
			//show the hidden div
			$('#ClaimMultipleDOCID').css('display','');
		}
		else
		{
			//otherwise, hide it
			$('#ClaimMultipleDOCID').css('display','none');
		}
	  });

	});
	*/
	
		$(obj).delegate(".ontop .close",'click',function(){
		
		closeObj = $(this);
		var buttonObject='#ClaimMultipleDOCID';		
		
		if(obj.find('.uploadify-queue-item').length==0){
		//alert('hua');		
		}else{	 
	 	$(buttonObject).closest('div').remove(".add-error");
		//	alert($(buttonObject).next('.add-error').length);
		$(buttonObject).removeClass('form-error');
		$(buttonObject).next('.add-error').remove();		
		//$( "div" ).remove( ".hello" );
		}
		});
	
function multiple_hide(){
	var row = $(obj).find('#table_row_claims_id').find('tr').length;
	var buttonObject='#ClaimMultipleDOCID';	
	if($('#ClaimHeaderSinglefileuploadID').is(':checked')==true){
	 
	if(obj.find('.uploadify-queue-item').length==0){
			//alert('hua');
		if(!($(buttonObject).hasClass('form-error'))){
			$(buttonObject).addClass('form-error');					
			$(buttonObject).after('<div class="add-error">Required</div>');
		}
		
	 }else{
	 
	 	$(buttonObject).removeClass('form-error');					
		$(buttonObject).closest('div').remove(".add-error");
		
		//$( "div" ).remove( ".hello" );
	 }
	 
	
	
		
		for(var k=0;k<=row;k++){
		
			$('#updoc'+k).css('display','none');
			$('#updoc'+k).closest('td').find("div").remove(".error-message");
			
		}
		$('#ClaimMultipleDOCID').css('display','');
	
	}else{
	
			//	alert('hua');
        if($(buttonObject).next('.add-error').length>0){
  		   $(buttonObject).closest('div').remove(".add-error");
		//	alert($(buttonObject).next('.add-error').length);
			$(buttonObject).removeClass('form-error');
			$(buttonObject).next('.add-error').remove();
		}

		
		$('#ClaimMultipleDOCID').css('display','none');	
		
		for(var i=0;i<=row;i++){
		
			$('#updoc'+i).css('display','');
		
		}
	}

}
/*
$(obj).submit(function(){
		
			
        var errroMessage = false;
		
		var buttonObject='#ClaimMultipleDOCID';	
		//alert(obj.find('.uploadify-queue-item').length+'--len');
		if(obj.find('.uploadify-queue-item').length==0 ){ 
				
			if($(buttonObject).hasClass('form-error')==false){
				
				$(buttonObject).addClass('form-error');					
				$(buttonObject).after('<div class="add-error">Required</div>');
			   errroMessage =true;
			}
		
		}else{
			$(buttonObject).removeClass('form-error');					
			$(buttonObject).next('.add-error').remove();
			$(buttonObject).closest('div').remove(".add-error");

		}
		});

*/

$(obj).bind('submit', function(e) {

        var errroMessage = false;		
		var buttonObject='#ClaimMultipleDOCID';
		if($('#ClaimHeaderSinglefileuploadID').is(':checked')==true){

		if(obj.find('.uploadify-queue-item').length==0 ){ 
				
			if($(buttonObject).hasClass('form-error')==false){
				
				$(buttonObject).addClass('form-error');					
				$(buttonObject).after('<div class="add-error">Required</div>');
			}
						   errroMessage =true;

		
		}else{
			$(buttonObject).removeClass('form-error');					
			$(buttonObject).next('.add-error').remove();
			$(buttonObject).closest('div').remove(".add-error");

		}
		}
//alert(errroMessage);
	if(errroMessage == false){
	
    if ($(this).valid() ) {


        if ($(this).find('input[type ="submit"]').length > 0) {

            $(this).find('input[type ="submit"]').attr('disabled', 'disabled');
        }

        if ($(this).find('button[type ="submit"]').length > 0) {

            $(this).find('button[type ="submit"]').attr('disabled', 'disabled');
        }


        return true;
    }
	}
    return false;
});



