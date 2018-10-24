

export class Flag{

    bidId: String;
    reportDate: number;
    status: String;
    issue: String;
    adminComment: String;

    constructor(obj){
        if(obj != null){
            obj && Object.assign(this, obj);
        }
    }

    setBidId(bidId: String){
        this.bidId = bidId;
    }
    getBidId(){
        return this.bidId;
    }
    setReportDate(date: number){
        this.reportDate = date;
    }
    getReportDate(){
        return this.reportDate;
    }
    setStatus(status: String){
        this.status = status;
    }
    getStatus(){
        return this.status;
    }
    setIssue(issue: String){
        this.issue = issue;
    }
    getIssue(){
        return this.issue;
    }
    setAdminComment(comment: String){
        this.adminComment = comment;
    }
    getAdminComment(){
        return this.adminComment;
    }
}