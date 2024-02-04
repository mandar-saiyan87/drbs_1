import os
from flask import Blueprint, request, send_file
from bson import ObjectId
from db import mongodb
import pandas as pd

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


@hallbooking_routes.route('/api/hallbooking/search', methods=['GET'])
def search_booking():
    search_text = request.args.get('query')
    try:
        search_result = mongodb.hallbooking.find(
            {'fullname': {"$regex": f".*{search_text}.*", "$options": "i"}})
        search_found = []
        for result in search_result:
            result['_id'] = str(result['_id'])
            search_found.append(result)
        if len(search_found) > 0:
            return {"status": "Success", "msg": "Booking found", "booking": search_found}
        else:
            return {"status": "Failed", "msg": "No booking found", "booking": []}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}


@hallbooking_routes.route('/api/hallbooking/export-excel', methods=['POST'])
def hallbooking_export():
    try:
        req_columns = request.json
        csv_cols = ['memberno', 'fullname']
        results = mongodb.hallbooking.find()

        booking_data = []
        for result in results:
            result['_id'] = str(result['_id'])
            if result['event'] == 'लग्न':
                result['event'] = 'Marriage'
            elif result['event'] == 'मुंज':
                result['event'] = 'Munj'
            elif result['event'] == 'इतर सांस्कृतिक कार्यक्रम':
                result['event'] = 'Other Cultural Event'
            elif result['event'] == 'नृत्य':
                result['event'] = 'Dance'
            elif result['event'] == 'नाट्य':
                result['event'] = 'Drama'
            elif result['event'] == 'संगीत':
                result['event'] = 'Music'
            elif result['event'] == 'सभा':
                result['event'] = 'Gathering'
            elif result['event'] == 'इतर':
                result['event'] = 'Other'

            if result['membership'] == 'आश्रयदाते':
                result['membership'] = 'Patrons'
            elif result['membership'] == 'आजीव':
                result['membership'] = 'Lifetime'
            elif result['membership'] == 'हितचिंतक':
                result['membership'] = 'Well Wisher'

            if result['bookingtype'] == 'अ':
                result['bookingtype'] = 'A'
            elif result['bookingtype'] == 'ब':
                result['bookingtype'] = 'B'
            elif result['bookingtype'] == 'क':
                result['bookingtype'] = 'C'
            elif result['bookingtype'] == 'ड':
                result['bookingtype'] = 'D'

            if result['hallno'] == 'सभागृह 1':
                result['hallno'] = 'Hall 1'
            elif result['hallno'] == 'सभागृह 2':
                result['hallno'] = 'Hall 2'
            elif result['hallno'] == 'दोन्ही':
                result['hallno'] = 'Both'

            if result['paymentmode'] == 'धनादेश':
                result['paymentmode'] = 'Cheque'

            booking_data.append(result)

        # print(members_data)
        if len(booking_data) > 0:
            df = pd.DataFrame(booking_data).drop('_id', axis=1)
            if len(req_columns['columnList']) > 0:
                csv_cols.extend(req_columns['columnList'])
                df = df[csv_cols]

            df.to_csv('./temp/hallbookings_data.csv', index=False)
            if os.path.exists('./temp/hallbookings_data.csv'):
                return send_file('./temp/hallbookings_data.csv', as_attachment=True)
            # return {"status": "Success", "msg": "CSV created successfully"}
        else:
            return {"status": "Failed", "msg": "No CSV found"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}
