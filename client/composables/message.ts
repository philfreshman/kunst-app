import {ElMessage} from 'element-plus'
import { ElNotification } from 'element-plus'


class Message {
    success(text?: string) {
        ElNotification({
            message: text == null ? "Success" : text,
            type: 'success',
        })
    }

    info(text?: string) {
        ElNotification({
            message: text == null ? "Info" : text,
            type: 'info',
        })
    }

    warning(text?: string) {
        ElNotification({
            message: text == null ? "Warning" : text,
            type: 'warning',
        })
    }

    error(text?: string) {
        ElNotification({
            message: text == null ? "Error" : text,
            type: 'error',
        })
    }
}


export default function useMessage() {
    return new Message()
}