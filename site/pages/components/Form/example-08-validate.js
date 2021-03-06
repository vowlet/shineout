/**
 * cn -
 *    -- 通过 Rule 对象，可以使用内置的规则。规则详见 <a href="/components/Rule">Rule</a>
 * en -
 *    -- Use <a href="/components/Rule">Rule</a> to create new rules object.
 */
import React from 'react'
import { Form, Input, Checkbox, Rule } from 'shineout'

const rules = Rule()

export default function() {
  return (
    <Form style={{ maxWidth: 500 }} scrollToError={30} onSubmit={d => console.log(d)}>
      <Form.Item required label="Email">
        <Input name="email" title="Email" rules={[rules.required, rules.email]} />
      </Form.Item>

      <Form.Item required label="Name">
        <Input name="name" title="Name" rules={[rules.required, rules.isExist]} />
      </Form.Item>

      <Form.Item required label="Password" tip="At least one letter, one numeral, and 6 - 20 characters.">
        <Input
          name="password"
          title="Password"
          type="password"
          rules={[rules.required, rules.range(6, 20), rules.password]}
        />
      </Form.Item>

      <Form.Item required label="Age" tip="between 18 and 60">
        <Input
          name="age"
          title="Age"
          style={{ width: 100 }}
          type="integer"
          rules={[rules.required, rules.integer, rules.range(18, 60)]}
        />
      </Form.Item>

      <Form.Item required label="Tel">
        <Input name="tel" title="Tel" rules={[rules.required, rules.regExp('^[\\d\\s ().-]+$')]} />
      </Form.Item>

      <Form.Item required label="IPv4">
        <Input name="IPv4" title="IP" rules={[rules.required, rules.ipv4]} />
      </Form.Item>

      <Form.Item required label="Favorite Colors" tip="select your favorite colors">
        <Checkbox.Group
          name="colors"
          keygen={d => d}
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          defaultValue={[]}
          title="Favorite Colors"
          rules={[rules.required('At least select one favorite color'), rules.min(2), rules.max(3)]}
        />
      </Form.Item>

      <Form.Item label="">
        <Form.Button>Sumbit</Form.Button>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}
