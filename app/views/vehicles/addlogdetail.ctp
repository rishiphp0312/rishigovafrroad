<?php $profile = $this->Session->read('Auth'); ?>
<div class="wrapper">
    <!-- Start breadcrumb here-->
    <div class="breadcrumb">
        <ul>
            <li class="first">
                <?php echo $this->Html->link('Home', array('controller' => 'profiles', 'action' => 'index'), array('title' => 'Home', 'class' => 'vtip')) ?>
            </li>

            <li class="last">Add Operator Vehicles Log Details</li>        
        </ul>
    </div>
    <!-- end breadcrumb here-->

    <!-- Start mainbody here-->
    <div class="mainbody">
        <h1><?php echo $mdclocal;?></h1>
        <h3>Customer Detail</h3>
		<div class="innerbody">
		<?php echo $this->Form->create('VehicleRegistrationCompany', array('url' => array('controller' => 'vehicles', 'action' => 'companysubmit'), 'type' => 'file','enctype'=>'multipart/form-data')); ?>
           <table> <tr>
                <td align="left" width="2%">
				Company Name :</td>
				<td width="16%"><?php
                        echo $this->Form->input('VehicleDetail.nu_company_id', array('label' => false,
                            'div' => false,
                            'type' => 'select',
                            'tabindex'=>'1',
							'required' => 'required',
                            'options' => $CompanyId,
                            'default' => $nu_company_id,
                            'onchange' => "formsubmit('VehicleRegistrationCompanyAddlogdetailForm');",
                            'maxlength' => 30,
                            'class' => 'round_select')
                        );
                        ?></td>
            </tr></table>
			<?php echo $this->Form->end(null); ?>
		</div>
        <?php echo $this->Form->create(array('url' => array('controller' => 'vehicles', 'action' => 'addlogdetail'))); ?>
        <!-- Start innerbody here-->
        <div class="innerbody">


            <table width="100%" border="0" cellpadding="3">
                <tr>
                    <td valign='top' ><label class="lab-inner">RFA Account No. :</label></td>
                    <td valign='top' >
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_customer_no', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_rfa_account_no',
                            'disabled' => 'disabled',
                            'value' => $profile['Profile']['vc_customer_no'],
                            'class' => 'round'));
                        ?>

                    </td>
                    <td valign='top' ><label class="lab-inner">Customer Id</label></td>
                    <td valign='top' >
                        <?php 
                        echo $this->Form->input('VehicleLogMaster.vc_customer_id', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_customer_id',
                            'disabled' => 'disabled',
                            'value' => $profile['Profile']['vc_customer_id'],
                            'class' => 'round'));
                        ?>

                    </td>
                    <td valign='top' ><label class="lab-inner">Customer Name :</label></td>
                    <td valign='top' > 
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_customer_name', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_customer_name',
                            'disabled' => 'disabled',
                            'value' => $profile['Profile']['vc_customer_name'],
                            'class' => 'round'));
                        ?>

                    </td>

                </tr>
                <tr>
                    <td valign='top' ><label class="lab-inner">Street Name :</label></td>
                    <td valign='top' >
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_address1', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_address1',
                            'disabled' => 'disabled',
                            'value' => $profile['Profile']['vc_address1'],
                            'class' => 'round'));
                        ?>
                        <!--<input type="text" class="round" />-->
                    </td>
                    <td valign='top' ><label class="lab-inner">House No. :</label></td>
                    <td valign='top' >
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_address2', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_address2',
                            'disabled' => 'disabled',
                            'value' => $profile['Profile']['vc_address2'],
                            'class' => 'round'));
                        ?>
                        <!--<input type="text" class="round" />-->
                    </td>
                    <td valign='top' ><label class="lab-inner">P.O Box :</label></td>
                    <td valign='top' >
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_po_box', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_po_box',
                            'disabled' => 'disabled',
                            'value' => $profile['Profile']['vc_address3'],
                            'class' => 'round'));
                        ?>
                        <!--<input type="text" class="round" />-->
                    </td>
                </tr>
				
                <tr>   <td valign='top' ><label class="lab-inner">Town/City :</label></td>
                    <td valign='top' >
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_town', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_town',
                            'disabled' => 'disabled',
                            'value' => $profile['Profile']['vc_town'],
                            'class' => 'round'));
                        ?>
                        <!--<input type="text" class="round" />-->
                    </td>
                    <td valign='top' ><label class="lab-inner">Telephone No. :</label></td>
                    <td valign='top' >
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_tel_no', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_tel_no',
                            'disabled' => 'disabled',
                            'value' => $profile['Profile']['vc_tel_no'],
                            'class' => 'round'));
                        ?>
                        <!--<input type="text" class="round" />-->
                    </td>
                    <td valign='top' ><label class="lab-inner">Fax No. :</label></td>
                    <td valign='top' >
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_fax_no', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_fax_no',
                            'disabled' => 'disabled',
                            'value' => $profile['Profile']['vc_fax_no'],
                            'class' => 'round'));
                        ?>
                        <!--<input type="text" class="rounzd" />-->
                    </td>
                 
                </tr>
                <tr>

                    <td valign='top' ><label class="lab-inner">Email :</label></td>
                    <td valign='top' >
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_email_id', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_email_id',
                            'disabled' => 'disabled',
                            'value' => $profile['Profile']['vc_email_id'],
                            'class' => 'round'));
                        ?>
                        <!--<input type="text" class="round" />-->
                    </td>
                    <td valign='top' ><label class="lab-inner">Pay Frequency :</label></td>
                    <td valign='top' >
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_pay_frequency', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_pay_frequency',
                            'readonly' => 'readonly',
                            'class' => 'round disabled-field'));
                        ?>
                        <!--<input type="text" class="round" />-->
                    </td>
                    <td valign='top' ><label class="lab-inner">Mobile No. :</label></td>
                    <td valign='top' >
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_mobile_no', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_mobile_no',
                            'disabled' => 'disabled',
                            'value' => $profile['Profile']['vc_mobile_no'],
                            'class' => 'round'));
                        ?>
                        <!--<input type="text" class="round" />-->
                    </td>

                </tr>
                <tr>
                    <td width='14%' valign='top' ><label class="">Vehicle Licence No. :</label></td>
                    <td valign='top' >
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_vehicle_lic_no', array('label' => false,
                            'div' => false,
                            'type' => 'select',
							'tabindex'=>2,
                            'id' => 'vc_vehicle_lic_no',
                            'required' => 'required',
                            'maxlength' => 15,
                            'options' => $vehiclelist,
                            'class' => 'round_select')
                        );
                        ?>

                    </td>
                    <td valign='top' >Vehicle Register No. :</td>
                    <td valign='top'>
                        <?php
                        echo $this->Form->input('VehicleLogMaster.vc_vehicle_reg_no', array('label' => false,
                            'div' => false,
                            'type' => 'select',
                            'id' => 'vc_vehicle_reg_no',
                            'required' => 'required',
                            'maxlength' => 15,
                            'options' => @$vehicleReg,
                            'class' => 'round_select')
                        );
                        ?>
                    </td>
                    <td valign='top' > <label class="lab-inner">Customer Type :</label></td>
                    <td valign='top' >
                        <?php						
                        echo $this->Form->input('vc_cust_type', array('label' => false,
                            'div' => false,
                            'type' => 'text',
                            'id' => 'vc_cust_type',
                            'required' => 'required',
                            'value' => $profile['VC_CUST_TYPE']['vc_prtype_name'],							
                            'disabled' => 'disabled',
                            'class' => 'round'));
                        ?>
                        <!--<input type="text" class="round" />-->
                    </td>
                </tr>
            </table>

        </div>
        <!-- end innerbody here-->
        <h3>Vehicle Details</h3>
        <!-- Start innerbody here-->
		
        <div class="innerbody">
		<div  style="width:100%;float:left;" >
           	<table style="width:100%;"  cellspacing="1" cellpadding="5" border="0" >
                <tr class="listhead" id='headeraddlogID'>
						<td width="12%">Select Road</td>
						<td width="12%">Date</td>
						<td width="12%">Driver Name</td>
						<td width="13%">Start Odometer</td>
						<td width="12%">End Odometer</td>
						<td width="12%" id='headeraddlogID_6'>Origin</td>
						<td width="12%" id='headeraddlogID_7'>Destination</td>
						<td width="15%" colspan="4" id='headeraddlogID_8'>KM Travel on  Road </td>					
					<!--	<td width="10%" id='headeraddlogID_9' style="display:none;">Origin <br/>Other Road </td>
						<td width="9%" id='headeraddlogID_10' style="display:none;">Destination Other Road</td>
						<td width="10%" id='headeraddlogID_11' style="display:none;">KM Travel on Other Road</td>-->
                </tr>
            </table>
		</div>
            <div class="listsr1" style="width:100%;float:left;">
                <table style="width:100%;" cellspacing="0" cellpadding="5" border="0" >
                    <tr class="cont1">
					<td valign="top" style="width:12%;">
					<?php
						echo $this->Form->input('RoadID.0.',array('label' => false,
                                'div' => false,
                                'type' => 'select',
								'tabindex'=>3,                                
								'style' => 'width:74px',
								'options'=>array('Namibian Road','Other Road'),
                                'class' => 'round3 selectlog')
								);
						
						
						?>
					</td>
                        <td valign="top" style="width:12%;">
                            <?php
                            echo $this->Form->input('VehicleLogDetail.0.dt_log_date', array('label' => false,
                                'div' => false,
                                'type' => 'text',
									'tabindex'=>4,
								'readonly'=>'readonly',
                                'required' => 'required',
								'style' => 'width:63px',
                                'class' => 'round3 addlog'));
                            ?>


                        </td>
                        <td valign="top" style="width:13%;" >
                            <?php
                            echo $this->Form->input('VehicleLogDetail.0.vc_driver_name', array('label' => false,
                                'div' => false,
                                'type' => 'text',
                                'tabindex'=>5,
                                'required' => 'required',
                                'maxlength'=>100,
								'style' => 'width:70px',                                
                                'class' => 'round3'));
                            ?>
                           
                        </td>
                        <td valign="top" style="width:13%;" >
                            <?php
                            echo $this->Form->input('VehicleLogDetail.0.nu_start_ometer', array('label' => false,
                                'div' => false,
                                'type' => 'text',
                                'readonly' => 'readonly',
                                'maxlength'=>10,
								'style' => 'width:64px',                                
                                'required' => 'required',
                                'class' => 'round3'));
                            ?>
                           
                        </td>
                        <td valign="top" style="width:12%;">
                            <?php
                            echo $this->Form->input('VehicleLogDetail.0.nu_end_ometer', array('label' => false,
                                'div' => false,
                                'type' => 'text',
                                'maxlength'=>10,
								'style' => 'width:71px',
                                'tabindex'=>6,
                                'required' => 'required',
                                'class' => 'round3')
                            );
                            ?>
                           
                        </td>
                        <td valign="top" style="width:12%;" id='td_vc_orign_0id'>
                            <?php
													
                            echo $this->Form->input('VehicleLogDetail.0.vc_orign', array('label' => false,
                                'div' => false,
                                'type' => 'select',
								'options'=>$OriginCustomerLocationDistance,
                                'required' => 'required',                               
                                'maxlength'=>50,
								'style' => 'width:58px',
                                'tabindex'=>7,
                                'class' => 'round3 selectlog')
                            );
                            ?>
                            <!--<input type="text" class="round3" />-->
                        </td>
                        <td valign="top" style="width:12%;"  id='td_vc_destination_0id'>
                            <?php
													
                            echo $this->Form->input('VehicleLogDetail.0.vc_destination', array('label' => false,
                                'div' => false,
                                'type' => 'select',
								'options'=>array(''=>' Select '),                              
                                'required' => 'required',
                                'maxlength'=>50,
								'style' => 'width:57px',
                                'tabindex'=>8,
                                'class' => 'round3 selectlog')
                            );
                            ?>
                           
                        </td>
                        <td valign="top" style="width:15%;" id='td_nu_km_traveled_0id'  colspan="4" >
                            <?php
                            echo $this->Form->input('VehicleLogDetail.0.nu_km_traveled', array('label' => false,
                                'div' => false,
                                'type' => 'text',
                                'required' => 'required',
                                'readonly' => 'readonly',
                                'maxlength'=>10,
								'style' => 'width:73px',
                                'class' => 'round3')
                            );
							
                            ?>
                        
                        </td>
						 <td valign="top" width="87" style='display:none;' id='td_vc_other_road_orign_0id'>
                            <?php
                            echo $this->Form->input('VehicleLogDetail.0.vc_other_road_orign', array('label' => false,
                                'div' => false,                                 
								'type' => 'text',
								'required' => 'required',
								'maxlength'=>50,													
								'style'=>'display:none',
                                'tabindex'=>9,
                                'class' => 'round3 selectlog')
                            );
                            ?>
                        </td>
						 <td valign="top" width="83" style='display:none;' id='td_vc_other_road_destination_0id' >
                            <?php
                            echo $this->Form->input('VehicleLogDetail.0.vc_other_road_destination', array('label' => false,
                                'div' => false,
                                'type' => 'text',
								'required' => 'required',
								'maxlength'=>50,	
                                'tabindex'=>10,
								'style'=>'display:none',
                                'class' => 'round3 selectlog')
                            );
                            ?>
                        </td>
						
						<td valign="top" width="67" style='display:none;'  id='td_nu_other_road_km_traveled_0id'>
                            <?php
                            echo $this->Form->input('VehicleLogDetail.0.nu_other_road_km_traveled', array('label' => false,
                                'div' => false,
                                'type' => 'text',
                                'required' => 'required',
                                'maxlength'=>10,
								'readonly' => 'readonly',
                                'class' => 'round3')
                            );
                            ?>
                           
                        </td>
						
						
                    </tr>
					

                </table>
            </div>

            <table width="100%" border="0">
                <tr>
                    <td valign='top' align="center">
                        		
                        <?php
                        echo $this->Form->button('Add', array('label' => false,
                            'div' => false,
                            'id' => 'addrow',
                            'type' => 'button',
                            'class' => 'submit'));
                        ?>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      <?php
                        echo $this->Form->button('Remove', array('label' => false,
                            'div' => false,
                            'id' => 'rmrow',
                            'type' => 'button',
                            'class' => 'submit'));
                        ?>
                        &nbsp;&nbsp;&nbsp;&nbsp;							
                        <?php
                        echo $this->Form->button('Submit', array('label' => false,
                            'div' => false,
                            'id' => 'submit',
                            'type' => 'submit',
                            'class' => 'submit'));
                        ?>			
                    </td>

                </tr>
            </table>
        </div>
        <!-- end innerbody here-->    
        <?php echo $this->Form->end(null); ?>
    </div>
</div>	
    <!-- end mainbody here--> 
<?php echo $this->element('commonmessagepopup'); ?>
<?php echo $this->element('commonbackproceesing'); ?>	
<?php echo $this->Html->script('mdc/logdetail'); ?>