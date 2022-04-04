Guest.INVITE = '邀请中';
Guest.ACCEPT = '已接受';
Guest.REFUSE = '已拒绝';
Guest.ALL = '全部';

Guest.prototype.accept = function () {
    this.state = Guest.ACCEPT;
    guestsCount.inviteCount--;
    guestsCount.acceptCount++;
}
Guest.prototype.refuse = function () {
    this.state = Guest.REFUSE;
    guestsCount.inviteCount--;
    guestsCount.refuseCount++;
}

function Guest(name, phone, gender, relationship) {
    this.name = name;
    this.phone = phone;
    this.gender = gender;
    this.relationship = relationship;
    this.state = Guest.INVITE;
}
var glModel = angular.module("glModel", []);

glModel.factory("glService", function () {
    var guestList = {
        list: [
            // {name:'小明',phone:'13866933927',state:'邀请中'},
            // {name:'小红',phone:'13866933927',state:'已接受'},
            // {name:'小黄',phone:'13866933927',state:'已拒绝'}
        ],
        getList: function (state) {
            if (state == Guest.ALL) {
                return this.list.filter(function () {
                    return true;
                });
            }
            return this.list.filter(function (guest) {
                return guest.state == state;
            });
        },
        add: function (name, phone, gender, relationship) {
            var isOk = true;
            isOk = !!(isOk && name && phone);
            if (!isOk) {
                return {
                    code: 1,
                    guest: null
                }
            }
            var tempArray = this.list.filter(function (item) {
                return item.phone == phone;
            });
            if (tempArray.length > 0) {
                isOk = false;
                return {
                    code: 2,
                    guest: null
                }
            }
            var guest = new Guest(name, phone, gender, relationship);
            this.list.push(guest);
            return {
                code: 0,
                guest: guest
            }
        },
        remove: function (guest) {
            this.list = this.list.filter(function (item) {
                return item.phone != guest.phone;
            })
        }
    };
    return guestList;
});