<template>
    <div>
        <Breadcrumbs title="Create Document"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h5>Create Document</h5><span>Fill the form below with information for your document.</span>
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
                            <div class="row mt-2">
                                <div class="col">
                                    <div class="form-group">
                                        <label class="h4">Upload Files</label>
                                        <vue-dropzone v-on:vdropzone-sending="sendingEvent" ref="documentUpload" :options="singledropzoneOptions" class="dropzone digits">
                                        </vue-dropzone>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- Container-fluid Ends-->
    </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { VueEditor } from 'vue2-editor';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import axios from "axios"
import Datepicker from 'vuejs-datepicker';

export default {

    name: "Documents",
    components: {
        VueEditor,VueBootstrapTypeahead,Datepicker,
        vueDropzone: vue2Dropzone,

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
            contacts: [],
            searchReceiver: null,
            searchSender: null,
            documents:[],
            document: {
                id: '006d189a-21ab-44d0-a815-c0e3c4c1bc6c'
            },
            lastPage: '',
            currentPage: '',
            school_documents: true,
            pagination: {},
            singledropzoneOptions:{
                headers: {
                    "Access-Control-Allow-Origin" : "http://192.168.8.100:8080",
                    "Access-Control-Allow-Credentials":true,
                    "Access-Control-Allow-Headers":"Content-Type, Authorization, X-Requested-With, Accept, Content-Type, Origin, Cache-Control, X-PINGOTHER, X-File-Name, Cache-Control",
                    "Access-Control-Allow-Methods":"PUT, POST, GET, OPTIONS"
                },
                url: global.base_url + '/scans',
                thumbnailWidth: 150,
                maxFiles:5,
                maxFilesize: 6,
                addRemoveLinks: true,
                dictDefaultMessage:'<i class=\'icon-cloud-up\'></i><h6>Drop files for this Document here or click to upload.</h6><span>(Your files are uploaded <strong>directly</strong> when you select.)</span>'
            }

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
                this.document = resp.data
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
        getDocuments(page_number){
            if(this.school_documents){
                this.getSchoolDocuments(page_number)
            }
            else {
                this.getSchoolDocuments(page_number)
            }
        },
        sendingEvent (file, xhr, formData) {
            console.log('sendingeeee')
            formData.append('scanable_id', this.document.id);
            formData.append('scanable_type', 'document');
            formData.append('school_id', 1);
        },
    },
    created() {
        this.getSchoolContact()
    }
}
</script>

<style scoped>

</style>