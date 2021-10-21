<template>
    <div>
        <Breadcrumbs title="Documents"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <b-card header-tag="div" body-bg-variant="gray"  header-bg-variant="light-dark" >
                        <h5 slot="header" class="text-dark">Documents</h5>
                        <b-card-body>
                            <b-tabs pills slot="header" class="tabbed-card nav-primary">
                                <b-tab title="Documents" active>
                                    <template slot="title">
                                        <i class="icon-file"></i>Documents
                                    </template>
                                    <b-card-text>
                                        <div class="row draggable-card" v-dragula="documents" drake="card">

                                            <div class="col-sm-12 col-xl-6" v-for="(document,index) in documents" :key="index" >
                                                <div class="card">
                                                    <div class="card-header" v-html="document.title"></div>
                                                    <div class="card-body">
                                                        <p v-text="document.description"></p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </b-card-text>
                                    <b-card-footer>
                                        <button>nice</button>
                                    </b-card-footer>
                                </b-tab>
                                <b-tab title="Add Document">
                                    <template slot="title">
                                        <i class="fa fa-plus"></i>Document
                                    </template>
                                    <b-card-text class="mb-0">
                                        <div slot="with-padding">
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
                                    </b-card-text>
                                </b-tab>
                            </b-tabs>
                        </b-card-body>
                    </b-card>
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
export default {

    name: "Documents",
    components: {
        VueEditor,VueBootstrapTypeahead
    },
    data(){
        return {
            c_form:{
                title:'',
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
                city:'',
                state:'',
                zip:''
            },
            c_form_result:{
                title:null,
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
            ]

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
                title: this.c_form.title
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
    },
    created() {
    }
}
</script>

<style scoped>

</style>