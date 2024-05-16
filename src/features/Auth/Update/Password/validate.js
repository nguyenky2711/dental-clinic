import * as yup from 'yup';

export const schema = yup
    .object({
        oldPassword: yup
            .string()
            .required('* Vui lòng nhập mật khẩu')
            .matches(/^[^\W_]/, '* Yêu cầu một chữ cái không dấu hoặc số đứng đầu')
            .matches(
                /^(?!.*?[._]{2})/,
                '* Không được phép lặp lại 2 lần ký tự đặc biệt'
            )
            .min(6, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự')
            .matches(/^\S+$/, '* Vui lòng không được nhập khoảng trắng')
            // .matches(/[A-Z]/, '* Vui lòng nhập ít nhất 1 chữ in hoa')
            .matches(/[0-9]/, '* Vui lòng nhập ít nhất 1 số')
            .max(32, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự'),
        newPassword: yup
            .string()
            .required('* Vui lòng nhập mật khẩu')
            .matches(/^[^\W_]/, '* Yêu cầu một chữ cái không dấu hoặc số đứng đầu')
            .matches(
                /^(?!.*?[._]{2})/,
                '* Không được phép lặp lại 2 lần ký tự đặc biệt'
            )
            .min(6, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự')
            .matches(/^\S+$/, '* Vui lòng không được nhập khoảng trắng')
            // .matches(/[A-Z]/, '* Vui lòng nhập ít nhất 1 chữ in hoa')
            .matches(/[0-9]/, '* Vui lòng nhập ít nhất 1 số')
            .max(32, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự')
            .notOneOf(
                [yup.ref('oldPassword')],
                ' * Mật khẩu mới không thể trùng với mật khẩu cũ'
            ),
        confirmNewPassword: yup
            .string()
            .required('* Vui lòng xác nhận lại mật khẩu mới')
            .oneOf([yup.ref('newPassword'), null], ' * Mật khẩu chưa khớp'),
    })
    .required();
