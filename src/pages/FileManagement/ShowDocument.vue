<template>
    <div>
        <Breadcrumbs :sub="sub_breads" v-if="document.content" :title="document.content.title"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <p v-if="document.content" v-html="document.content.description"></p>
                            <div v-else class="loader-box">
                                <div class="loader-4"></div>
                            </div>
                        </div>
                    </div>
              </div>               
            </div>

        </div>
        <!-- Container-fluid Ends-->
        <div v-if="document.id" class="container-fluid">
            <div class="row">
                <div class="col-xl-3 pr-sm-0 box-col-12">
                    <div class="file-sidebar">
                        <div class="card">
                            <div class="card-body">
                                <ul>
                                    <li>
                                        <div class="m-t-15">
                                            <div class="form-group">
                                                <label class="h4">Upload Files</label>
                                                <vue-dropzone v-on:vdropzone-sending="sendingEvent" ref="documentUpload" id="documentUpload" :options="singledropzoneOptions" class="dropzone digits">
                                                </vue-dropzone>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <hr />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-9 col-md-12 box-col-12">
                    <div class="file-content">
                        <div class="card">
                            <div class="card-header">
                                <div class="media">
                                    <form class="form-inline" action="#" method="get">
                                        <div class="form-group mb-0">
                                            <i class="fa fa-search"></i>
                                            <input v-model="search_doc" @change="searchDocFile"
                                                class="form-control-plaintext"
                                                type="text"
                                                placeholder="Search..."
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card-body file-manager">
                                <h4 class="mb-3">All Files</h4>
                                <h6>Recently opened files</h6>
                                <ul class="files">
                                    <li v-for="file in files" :key="file.id" class="file-box">
                                        <div class="file-top">
                                            <i v-if="checkClass(file) === 'psd'" class="fa fa-file-image-o txt-primary"></i>
                                            <i v-else-if="checkClass(file) === 'png'" class="fa fa-file-image-o txt-secondary"></i>
                                            <i class="fa fa-ellipsis-v f-14 ellips"></i>
                                        </div>
                                        <div class="file-bottom">
                                            <h6>{{ file.name}}</h6>
                                            <p class="mb-1">{{  fileSize(file.size) }}</p>
                                            <p><b>Added on : </b>{{ file.created_at | moment("from") }}</p>
                                        </div>
                                    </li>
                                </ul>
                                <b-pagination-nav v-if="files.length > 0" @page-click="numberClicked"
                                    :number-of-pages="total"
                                    base-url="#"
                                    first-text="First"
                                    prev-text="Prev"
                                    next-text="Next"
                                    last-text="Last"
                                ></b-pagination-nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import axios from "axios"
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
export default {
    name: 'ShowDocument',
    components: {
        vueDropzone: vue2Dropzone,

    },
    data(){
        return {
            search_doc: '',
            files: [],
            sub_breads :[
                {
                    link: 'documents/all/school',
                    name: 'Documents'
                },
            ],
            title: '',
            document: {},
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
            },
            total: '',
            lastPage: '',
            currentPage: '',
            loading: {
                files: true
            },
            pagination: {},
        }
    },
    methods: {
        searchDocFile(page_number){
            if(this.search_doc.length < 2){
                return
            }
            axios.get('/scans/documents/' + this.document.id + '/scans/' + page_number + '/' + this.search_doc).then((resp) => {
                console.log(resp.data);
                this.files = resp.data.data
                this.paginationMethod(resp.data.current_page, resp.data.last_page)
                this.currentPage =resp.data.current_page;
                this.lastPage = resp.data.last_page;
                this.total = resp.data.total;
            })
        },
        checkClass(file){
            let name_explode = file.name.split('.')
            let ext = name_explode[name_explode.length -1]
            return ext;
        },

        fileSize(size) {
            var i = Math.floor(Math.log(size) / Math.log(1024));
            return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
        },
        sendingEvent (file, xhr, formData) {
            console.log('sendingeeee')
            formData.append('scanable_id', this.document.id);
            formData.append('scanable_type', 'document');
            formData.append('school_id', 1);
        },

        numberClicked(bvEvent, page){
            console.log('nice sad');
            console.log(page);
            if(this.currentPage != page){
                this.getScanDocs(page)
            }
        },
        getScanDocs(page_number){
            axios.get('/scans/documents/' + this.document.id + '/scans/' + page_number).then((resp) => {
                console.log(resp.data);
                this.files = resp.data.data
                this.paginationMethod(resp.data.current_page, resp.data.last_page)
                this.currentPage =resp.data.current_page;
                this.lastPage = resp.data.last_page;
                this.total = resp.data.total;
            })
        },
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


    },
    created(){
        let doc_id = this.$route.params.document_id

        axios.get('/documents/' + doc_id).then((resp) =>{
            this.document = resp.data
            console.log(resp.data)
            this.getScanDocs(1)
        })
    }
}
</script>