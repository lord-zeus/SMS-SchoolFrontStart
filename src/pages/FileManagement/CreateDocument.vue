<template>
    <div>
        <Breadcrumbs title="Create Document"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h5>Sample Card</h5><span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
                        </div>
                        <div class="card-body">
                            <b-form class="needs-validation" @submit="onCustomStyleSubmit">
                                <div class="form-row">
                                    <div class="col-md-12 mb-3">
                                        <label for="c_form_title">Document Title</label>
                                        <b-form-input type="text" id="c_form_title" v-model="c_form.title" :state="c_form_result.title" placeholder="Document Title"></b-form-input>
                                        <b-form-valid-feedback :state="c_form_result.title">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <label for="c_form_description">Document Description/Content</label>
                                        <vue-editor v-model="c_form.description"></vue-editor>
                                        <b-form-valid-feedback :state="c_form_result.description">Lock Good</b-form-valid-feedback>
                                    </div>

                                </div>
                                <hr>
                                <div class="form-row">
                                    <div class="col-md-12 mb-3">
                                        <h4 class="h4">Folder Details</h4>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_folder_name">Folder name</label>
                                        <b-form-input type="text" id="c_form_folder_name" v-model="c_form.folder_name" :state="c_form_result.folder_name" placeholder="Folder Name"></b-form-input>
                                        <b-form-valid-feedback :state="c_form_result.folder_name">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_folder_location">Folder Location</label>
                                        <b-form-input type="text" id="c_form_folder_location" v-model="c_form.folder_location" :state="c_form_result.folder_location" placeholder="Folder Name"></b-form-input>
                                        <b-form-valid-feedback :state="c_form_result.folder_location">Lock Good</b-form-valid-feedback>
                                    </div>
                                </div>

                                <hr>
                                <div class="form-row">
                                    <div class="col-md-12 mb-3">
                                        <h4 class="h4">Document Dates</h4>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_sent_date">Sent Date</label>
                                        <datepicker id="c_form_sent_date" v-model="c_form.sent_date" input-class="datepicker-here form-control digits" ></datepicker>
                                        <b-form-valid-feedback :state="c_form_result.sent_date">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_received_date">Received Date</label>
                                        <datepicker id="c_form_received_date" v-model="c_form.received_date" input-class="datepicker-here form-control digits" ></datepicker>
                                        <b-form-valid-feedback :state="c_form_result.received_date">Lock Good</b-form-valid-feedback>
                                    </div>
                                </div>

                                <hr>
                                <div class="form-row">
                                    <div class="col-md-6 mb-3">
                                        <h4 class="h4">Sender Details</h4>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <h4 class="h4">Receiver's Details</h4>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_sender_name">Sender Name</label>
                                        <vue-bootstrap-typeahead
                                            class="mb-3"
                                            v-model="c_form.sender_name"
                                            :data="contacts"
                                            :serializer="item => item.name"
                                            @hit="searchSender = $event"
                                            placeholder="Sender Name"
                                        >
                                        </vue-bootstrap-typeahead>
                                        <b-form-valid-feedback :state="c_form_result.sender_name">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_receiver_name">Receiver Name</label>
                                        <vue-bootstrap-typeahead
                                            class="mb-3"
                                            v-model="c_form.receiver_name"
                                            :data="contacts"
                                            :serializer="item => item.name"
                                            @hit="searchReceiver = $event"
                                            placeholder="Receiver Name"
                                        >
                                        </vue-bootstrap-typeahead>
                                        <b-form-valid-feedback :state="c_form_result.receiver_name">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_sender_name">Sender Address</label>
                                        <b-form-input type="text" id="c_form_sender_address" v-model="c_form.sender_address" :state="c_form_result.sender_address" placeholder="Sender Position"></b-form-input>
                                        <b-form-valid-feedback :state="c_form_result.sender_address">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_receiver_name">Receiver Address</label>
                                        <b-form-input type="text" id="c_form_receiver_address" v-model="c_form.receiver_address" :state="c_form_result.receiver_address" placeholder="Receiver Address"></b-form-input>
                                        <b-form-valid-feedback :state="c_form_result.receiver_address">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_sender_name">Sender Position</label>
                                        <b-form-input type="text" id="c_form_sender_position" v-model="c_form.sender_position" :state="c_form_result.sender_position" placeholder="Sender Position"></b-form-input>
                                        <b-form-valid-feedback :state="c_form_result.sender_position">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_receiver_name">Receiver Position</label>
                                        <b-form-input type="text" id="c_form_receiver_position" v-model="c_form.receiver_position" :state="c_form_result.receiver_position" placeholder="Receiver Position"></b-form-input>
                                        <b-form-valid-feedback :state="c_form_result.receiver_position">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_sender_name">Sender Phone</label>
                                        <b-form-input type="text" id="c_form_sender_phone" v-model="c_form.sender_phone" :state="c_form_result.sender_phone" placeholder="Sender Phone"></b-form-input>
                                        <b-form-valid-feedback :state="c_form_result.sender_phone">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_receiver_name">Receiver Phone</label>
                                        <b-form-input type="text" id="c_form_receiver_phone" v-model="c_form.receiver_phone" :state="c_form_result.receiver_phone" placeholder="Receiver phone"></b-form-input>
                                        <b-form-valid-feedback :state="c_form_result.receiver_phone">Lock Good</b-form-valid-feedback>
                                    </div>
                                </div>

                                <b-button type="submit" variant="primary">Submit Form</b-button>
                            </b-form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- Container-fluid Ends-->
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import axios from "axios"
import Datepicker from 'vuejs-datepicker';

export default {

    name: "Documents",
    components: {
        VueEditor,VueBootstrapTypeahead,Datepicker
    },
    data(){
        return {
            c_form:{
                title:'',
                description:'',
                folder_name:'',
                folder_location:'',
                username:'',
                sender_name: '',
                sender_address: '',
                sender_position: '',
                sender_phone: '',
                receiver_name: '',
                receiver_address: '',
                receiver_position: '',
                receiver_phone: '',
                sent_date: '',
                received_date: '',
                city:'',
                state:'',
                zip:''
            },
            c_form_result:{
                title:null,
                description:null,
                sent_date:null,
                received_date:null,
                folder_name:null,
                folder_location:null,
                username:null,
                sender_name:null,
                city:null,
                state:null,
                zip:null
            },
            contacts: [
                {
                    name: 'Nsagha Kingsly',
                    address: 'Molyko Buea',
                    position: 'Principal',
                    phone: '679320168'
                },
                {
                    name: 'James Kingsly',
                    address: 'Molyko Buea',
                    position: 'Principal',
                    phone: '679320168'
                },
                {
                    name: 'Nsagha Emerrencia',
                    address: 'Molyko Buea',
                    position: 'Principal',
                    phone: '679320168'
                },
                {
                    name: 'Neba Jones',
                    address: 'Molyko Buea',
                    position: 'Principal',
                    phone: '679320168'
                },
            ],
            searchReceiver: null,
            searchSender: null,
            documents:[
                {
                    title:'<h5>Basic Card</h5>',
                    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.'
                },
                {
                    title:'<h5>Flat Card</h5>',
                    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.'
                },
                {
                    title:'<h5>Without shadow Card</h5>',
                    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.'
                },
                {
                    title:'<h5><i class="icon-move mr-2"></i> Icon in Heading</h5>',
                    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.'
                },
                {
                    title:'<h5>Card sub Title</h5><span>Using the <a href="#">card</a> component, you can extend the default collapse behavior to create an accordion.</span>',
                    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.'
                },
                {
                    title:'<h5>Card sub Title</h5><span>Using the <a href="#">card</a> component, you can extend the default collapse behavior to create an accordion.</span>',
                    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.'
                }
            ],
            lastPage: '',
            currentPage: '',
            school_documents: true,
            pagination: {},

        }
    },
    watch: {
        searchReceiver(){
            console.log(this.searchReceiver.name)
            console.log(this.searchReceiver.address)
            this.c_form.receiver_address = this.searchReceiver.address
            this.c_form.receiver_phone = this.searchReceiver.phone
            this.c_form.receiver_position = this.searchReceiver.position
        },
        searchSender(){
            console.log(this.searchSender.name)
            console.log(this.searchSender.address)
            this.c_form.sender_address = this.searchSender.address
            this.c_form.sender_phone = this.searchSender.phone
            this.c_form.sender_position = this.searchSender.position
        }
    },
    methods: {
        paginationMethod(c, m){
            var current = c,
                last = m,
                delta = 2,
                left = current - delta,
                right = current + delta + 1,
                range = [],
                rangeWithDots = [],
                l;

            for (let i = 1; i <= last; i++) {
                if (i == 1 || i == last || i >= left && i < right) {
                    range.push(i);
                }
            }

            for (let i of range) {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1);
                    } else if (i - l !== 1) {
                        rangeWithDots.push('...');
                    }
                }
                rangeWithDots.push(i);
                l = i;
            }

            console.log(rangeWithDots)
            this.pagination = rangeWithDots;
            return rangeWithDots;
        },

        onCustomStyleSubmit(evt){
            evt.preventDefault();
            if(this.c_form.title !== '') {
                this.c_form_result.title = true;
                this.submitDocument()
            } else {
                this.error_with_icon('times', 'Fill Document Title', 'error')
                this.c_form_result.title = false;
            }
        },
        submitDocument(){
            axios.post('/documents', {
                title: this.c_form.title,
                description: this.c_form.description,
                sent_date: this.c_form.sent_date,
                sender_name: this.c_form.sender_name,
                sender_address: this.c_form.sender_address,
                sender_position: this.c_form.sender_position,
                sender_phone: this.c_form.sender_phone,
                received_date: this.c_form.received_date,
                receiver_name: this.c_form.receiver_name,
                receiver_address: this.c_form.receiver_address,
                receiver_position: this.c_form.receiver_position,
                receiver_phone: this.c_form.receiver_phone,
                school_id: 1,
                user_id: 1,
            }).then((resp) => {
                console.log('done')
                console.log(resp.data)
            }).catch((error) => {
                console.log(error)
            })
        },
        receiverSelected(evt, item){
            console.log(item)
            console.dir(evt)
        },
        error_with_icon(icon, message, type) {
            this.$toasted.show(` ${message} `, { theme: 'outline',position: 'top-right', icon : icon, type: type, duration: 2000 });
        },

        getSchoolContact(){
            axios.get('/contacts/schools/1').then((resp) => {
                this.contacts = resp.data.data
            })
        },

        getSchoolDocuments(page_number){
            let school_id = 1
            axios.get('/documents/schools/' + school_id + '/'+ page_number).then((resp) => {
                this.documents = resp.data.data
                console.dir(resp.data.data)
                this.paginationMethod(resp.data.current_page, resp.data.last_page)
                this.currentPage =resp.data.current_page;
                this.lastPage = resp.data.last_page;
            })
        },
        getDocuments(page_number){
            if(this.school_documents){
                this.getSchoolDocuments(page_number)
            }
            else {
                this.getSchoolDocuments(page_number)
            }
        }
    },
    created() {
        this.getDocuments(1)
        this.getSchoolContact()
    }
}
</script>

<style scoped>

</style>