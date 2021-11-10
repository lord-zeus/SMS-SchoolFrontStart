<template>
    <div>
        <Breadcrumbs title="Documents"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row draggable-card" v-dragula="documents" drake="card">
                <div class="col-xl-4 xl-50 appointment box-col-6" v-for="(document,index) in documents" :key="index">
                    <px-card :actions="false">
                        <div slot="headerCustom">
                            <div class="header-top">
                                <h5 class="m-0"><a class="hovered" @click="showDoc(document)">{{ document.content.title}}</a></h5>
                                <div class="card-header-right-icon">
                                    <b-dropdown text="" :class="'btn-round btn-sm text-right'" variant="light">
                                        <b-dropdown-item @click="showDoc(document)">View</b-dropdown-item>
                                        <b-dropdown-item>Edit</b-dropdown-item>
                                        <b-dropdown-divider></b-dropdown-divider>
                                        <b-dropdown-item>Delete</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="card-body">
                                <p v-html="document.content.description"></p>
                            </div>
                        </div>
                    </px-card>
                </div>

            </div>
            <div class="row">
                <div class="col-xl-12">
                    <div align="center">
                        <a @click="getDocuments(currentPage -1)" :class="{disabled :currentPage === 1}" class="btn btn-outline-primary" >&laquo;</a>
                        <a v-for="(listItem, key) in pagination" :key="key" :class="{disabled :(currentPage === listItem || listItem === '...'),  'btn-outline-primary ': currentPage === listItem, 'text-red': currentPage === listItem}" class="btn btn-outline-primary " @click="getDocuments(listItem)">{{ listItem }}</a>
                        <a ref="#" :class="{disabled :lastPage === currentPage}" @click="getDocuments(currentPage +1)" class="btn btn-outline-primary " >&raquo;</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Container-fluid Ends-->
    </div>
</template>

<script>
import axios from "axios"
export default {

    name: "Documents",
    data(){
        return {
            hover: '',
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
    methods: {
        hoverChange(){
            this.hover = 'link'
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

        error_with_icon(icon, message, type) {
            this.$toasted.show(` ${message} `, { theme: 'outline',position: 'top-right', icon : icon, type: type, duration: 2000 });
        },

        getDocuments(page_number, type){
            let school_id = 1
            axios.get('/documents/' + school_id + '/'+ page_number + '/' +type).then((resp) => {
                this.documents = resp.data.data
                console.dir(resp.data.data)
                this.paginationMethod(resp.data.current_page, resp.data.last_page)
                this.currentPage =resp.data.current_page;
                this.lastPage = resp.data.last_page;
            })
        },
        showDoc(document){
            this.$router.push({ name: 'showDocument', params: { document_id: document.id } })
        }
    },
    created() {
        console.log(this.$route.params)
        this.getDocuments(1, this.$route.params.type)
    }
}
</script>

<style scoped>
    .hovered:hover {
        cursor: pointer;
        @extend .link;
    }
</style>