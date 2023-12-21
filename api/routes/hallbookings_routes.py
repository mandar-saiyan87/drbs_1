from flask import Blueprint, request
from bson import ObjectId
from db import mongodb

hallbooking_routes = Blueprint('/api/hallbooking', __name__)


@hallbooking_routes.route('/api/hallbooking/getbookings', methods=['GET'])
def get_bookings():
    try:
        results = mongodb.hallbooking.find()
        # print(results)
        bookings = []
        for result in results:
            result['_id'] = str(result['_id'])
            bookings.append(result)

        if len(bookings) > 0:
            return {"status": "Success", "msg": "Members found", "bookings": bookings}
        else:
            return {"status": "Failed", "msg": "No members found", "bookings": []}
            # return {"status": "In progress", "msg": "In progress"}
    except Exception as e:
        return {'status': 'Failed', 'msg': 'Something went wrong', 'error': str(e)}


@hallbooking_routes.route('/api/hallbooking/newbooking', methods=['POST'])
def new_booking():
    newBooking = request.json['newBooking']
    # print(newBooking)
    try:
        booking_add = mongodb.hallbooking.insert_one(newBooking)
        if booking_add.acknowledged:
            newBooking['_id'] = str(booking_add.inserted_id)
            return {"status": "Success", "msg": "New booking added successfully", "id": newBooking['_id']}
        else:
            return {"status": "Failed", "msg": "Booking not added"}
    # return {"status": "In progress", "msg": "In progress"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}


@hallbooking_routes.route('/api/hallbooking/deletebooking', methods=['DELETE'])
def delete_booking():
    booking_id = request.json['id']
    booking_del = ObjectId(booking_id)
    try:
        result = mongodb.hallbooking.delete_one({'_id': booking_del})
        if result.acknowledged:
            return {"status": "Success", "msg": "Booking deleted successfully"}
        else:
            return {"status": "Failed", "msg": "Booking not deleted"}
        # return {"status": "In progress", "msg": "In progress"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}


@hallbooking_routes.route('/api/hallbooking/updatebooking', methods=['PUT'])
def update_booking():
    data = request.json
    newData = data['newbookingDetails']
    bookid = ObjectId(data['id'])
    # print(newData)
    # print(bookid)
    try:
        memberUpdate = mongodb.hallbooking.find_one_and_update(
            {'_id': bookid}, {'$set': newData})
        return {"status": "Success", "msg": "Member updated successfully"}
        # return {"status": "In progress", "msg": "In progress"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}
