import {AfterViewChecked, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomerService} from '../customer.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {


  email = '';
  password = '';

  routerLink: any = "";


  @Output() messageEvent: EventEmitter<boolean> = new EventEmitter();


  loginForm: FormGroup;
  advertisers: any[];

  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder
               , private customer: CustomerService, private router: Router, public snackBar: MatSnackBar) {

    this.loginForm = this.fb.group({
        userNameFormField: ['', [Validators.required, Validators.required]],
        passwordFormField: ['', [Validators.required]],
      }
    );

    this.loginForm.controls['userNameFormField'].setValue(this.email);
    this.loginForm.controls['passwordFormField'].setValue(this.password);

  }


  ngOnInit() {
	 // console.log(this.customer.getToken());
	  // if(this.customer.getToken() !== null){
		//   //console.log('1');
		//  this.router.navigateByUrl('/audience-without-stats');
	  // }else{
		// //   console.log('2');
		// this.loggedOut();
	  // }
  }
  

  ngAfterViewChecked() {

  }

  loggedOut() {
    this.customer.loggedOut()
    this.messageEvent.emit(false);
	////console.log(this.messageEvent);
  }

  loggedIn() {
    this.messageEvent.emit(true);
	////console.log(this.messageEvent);
  }
  submitted: any = false;
  agencyUserId: any = null;
  tryLogin() {
	  this.submitted = true;
	this.agencyUserId = null;
	if(this.loginForm.valid){
	localStorage.setItem('sortOrder', '');
	localStorage.setItem('PageCount', '');
	this.spinner.show();
    // this.api.login(
    //   this.loginForm.controls['userNameFormField'].value,
    //   this.loginForm.controls['passwordFormField'].value
    // )
    //   .subscribe(
    //     r => {
    //       //console.log(r);
    //       if (r.successful) {
    //         this.customer.setToken(r.content.access_token);
    //         this.customer.setRefreshToken(r.content.refresh_token);

    //         //console.log(r.content.user);
    //         this.customer.setUserObject(r.content.user.email);
            
    //         localStorage.setItem('isFirstLogin', "1");

    //         ////console.log(r.content.user.id);
    //         this.loggedIn();
		// 	this.customer.setProfileType(r.content.user.userType);
    //   this.customer.setUserRole(r.content.user.isAdmin);
    //   if(r.content.user.isAdmin===true){
    //     localStorage.setItem('AdminToken', r.content.access_token);
    //   }
		// 	 //console.log(r.content.user);agency.loggedInSubUserId
		// 	localStorage.setItem('logedInUserData', JSON.stringify(r.content.user));
		// 	localStorage.setItem('logedInUserId', r.content.user.id);
		// 	localStorage.setItem('logedInSubUserId', r.content.user.loggedInSubUserId);
		// 	localStorage.setItem('UserChanged', 'true');
		// 	localStorage.setItem('companyName', r.content.user.compName);
		// 	localStorage.setItem('advertiser', '[]');
		// 	localStorage.setItem('Alladvertiser', '[]');
		// 	localStorage.setItem('advertiserId', '0');
		// 	localStorage.setItem('isAgAdv', '0');
		// 	localStorage.setItem('advertiserName', '');
		// 	////console.log(r.content);
		// 	//GET_CREATIVES_STATUS_URL
    //         if (r.content.user.advertiserExists) {
    //           this.customer.setProfileImage(r.content.user.logoURL);
    //           this.routerLink = '/audience-without-stats';
    //         } else {
    //           this.routerLink = 'advertise-profile';
    //         }
            
    //         ////console.log(r.content.user.isAdmin);
    //         if (r.content.user.userType === 'Advertiser') {
    //           // this.getCompany(r.content.access_token);
    //         }else if(r.content.user.userType === 'User'){
		// 	  this.agencyAdvertiser(r.content.user);
    //         }else if (r.content.user.userType === 'Agency'){
    //           // this.getAdvertisers();
		// 	  this.agencyUserId = r.content.user.agencyAdvertiserId;
    //         /*}else if (r.content.user.userType === 'User_Agency'){
    //           this.getUserAgency(r.content.user);
    //         }*/
		//     }

    //       } else {
    //         this.spinner.hide();
    //         swal(r.message, '', 'error');
    //       }
    //     });
	}
  }
 /* getUserAgency(data){
	  //console.log(data);
	  let agency = JSON.parse(localStorage.getItem('logedInUserData'));
	  agency.id = agency.parentAgencyAdvertiser;
	  //agency.userType = 'Agency';
	  // console.log(agency);
	  localStorage.setItem('logedInUserData', JSON.stringify(agency));
	  this.customer.setProfileType('User_Agency');
	  this.advertisers = data.agency;
        console.log(this.advertisers);
         localStorage.setItem('companyName', data.compName);

        if(this.advertisers){
			//localStorage.setItem('advertiser', JSON.stringify(this.advertisers));
			localStorage.setItem('Alladvertiser', JSON.stringify(this.advertisers));
          this.advertisers.forEach(adv => {
			  console.log(adv);
			  //GET_CREATIVES_STATUS_URL//also in admin				
            //setting 0 index advertiser on local storage because agency removed from combo
            if(adv.isSelected && adv.isSelected === '1'){
              console.log('selected: '+adv.compName);
			  const advertiserNameVal: any = adv.compName;
              localStorage.setItem('advertiser', JSON.stringify(adv));
              localStorage.setItem('advertiserId', adv.id);
              localStorage.setItem('isAgAdv', '1');
              localStorage.setItem('advertiserName', advertiserNameVal);
            }
          });
		}
		this.router.navigateByUrl(this.routerLink);
  }*/
  agencyAdvertiser(data){
	  let agency = JSON.parse(localStorage.getItem('logedInUserData'));
	  agency.id = agency.parentId;
	  // console.log(agency);
	  localStorage.setItem('logedInUserData', JSON.stringify(agency));
    localStorage.setItem('advertiser', '[]');
    /*if(data.parentAgencyAdvertiser){
      localStorage.setItem('advertiserId', data.parentAgencyAdvertiser);
      localStorage.setItem('isAgAdv', '1');
    }else{*/
      localStorage.setItem('advertiserId', '0');
      localStorage.setItem('isAgAdv', '0');
    //}
	  localStorage.setItem('advertiserName', data.compName);
	  this.router.navigateByUrl(this.routerLink);
	  
  }
  
  // getAdvertisers(){
  //   this.campaignService.getAdvertisersList().subscribe(r =>{
  //     //console.log(r)
  //     //console.log('adv: '+r);
  //     if(r.successful && r.content){
  //       this.advertisers = r.content.agency;
  //       //console.log(r.content.compName);
  //        localStorage.setItem('companyName', r.content.compName);
	// 	// localStorage.setItem('logedInUserData', JSON.stringify(this.advertisers));
  //       if(this.advertisers){
	// 		//localStorage.setItem('advertiser', JSON.stringify(this.advertisers));
	// 		localStorage.setItem('Alladvertiser', JSON.stringify(this.advertisers));
  //         this.advertisers.forEach(adv => {
	// 			if(this.agencyUserId && this.agencyUserId === adv.id){
	// 				//console.log('selected: '+adv.id);
	// 			  const advertiserNameVal: any = adv.compName;
	// 			  localStorage.setItem('advertiser', JSON.stringify(adv));
	// 			  localStorage.setItem('advertiserId', adv.id);
	// 			  localStorage.setItem('isAgAdv', '1');
	// 			  localStorage.setItem('advertiserName', advertiserNameVal);
	// 			}else if(!this.agencyUserId){
	// 				//console.log(adv.id);
	// 				//setting 0 index advertiser on local storage because agency removed from combo
	// 				if(adv.isSelected && adv.isSelected === '1'){
	// 					//GET_CREATIVES_STATUS_URL//also in admin
	// 				var json = {
	// 					"creative": {
	// 						"advertiser_id"  :  adv.externalId
	// 					}
	// 				};
	// 				this.campaignService.getAdvertiserCreativeStatus(json).subscribe(r =>{
	// 					//console.log(r);
	// 				});
	// 				  ////console.log('selected: '+adv.compName);
	// 				  const advertiserNameVal: any = adv.compName;
	// 				  localStorage.setItem('advertiser', JSON.stringify(adv));
	// 				  localStorage.setItem('advertiserId', adv.id);
	// 				  localStorage.setItem('isAgAdv', '1');
	// 				  localStorage.setItem('advertiserName', advertiserNameVal);
	// 				}
	// 			}
  //         });
  //       }else{
  //         localStorage.setItem('advertiser', '[]');
  //         localStorage.setItem('advertiserId', '');
  //         localStorage.setItem('isAgAdv', '');
  //         localStorage.setItem('advertiserName', '');
  //       }
  //     }
      
  //     this.router.navigateByUrl(this.routerLink);
  //   });
  // }

  // getCompany(userToken){
  //   this.companyService.getCompany(userToken).subscribe(r => {
  //     //console.log(r);

  //     if (r.code !== 'HTTP_404') {
  //       //console.log(r.content);
  //       const company = r.content;
	// 	//GET_CREATIVES_STATUS_URL//also in admin
	// 	var json = {
	// 		"creative": {
	// 			"advertiser_id"  :  company.externalId
	// 		}
	// 	};
	// 	this.campaignService.getAdvertiserCreativeStatus(json).subscribe(r =>{
	// 		//console.log(r);
	// 	});
	// 	/*this.campaignService.getAdvertiserLineItemStatus(json).subscribe(r =>{
	// 		//console.log(r);
	// 	});*/
  //       const advertiserNameVal: any = company.compName;
  //       //setting agency/advertiser or agencyAdvertiser
  //       localStorage.setItem('advertiser', JSON.stringify(company));
  //       localStorage.setItem('advertiserId', '0');
  //       localStorage.setItem('isAgAdv', '0');
  //       localStorage.setItem('companyName', advertiserNameVal);
        
  //     }
      
  //     this.router.navigateByUrl(this.routerLink);

  //   }
  // );
  // }
  get errorLoginEmail() {
	return this.loginForm.get('userNameFormField');
  }
  get errorLoginPassword() {
	return this.loginForm.get('passwordFormField');
  }
}
